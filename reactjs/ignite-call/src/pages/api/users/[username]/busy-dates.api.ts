/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { month, year, username } = req.query

  if (!(month && year)) {
    return res.status(400).json({
      message: 'Either [month] or [year] is undefined',
    })
  }

  if (typeof username !== 'string') {
    return res.status(400).json({
      message: 'Invalid [username] value',
    })
  }

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return res.status(400).json({
      message: 'User not found for the provided [username]',
    })
  }

  const availableDates = await prisma.userTimeInterval.findMany({
    select: { week_day: true },
    where: { user_id: user.id },
  })

  const unscheduledDates = [0, 1, 2, 3, 4, 5, 6].filter((weekday) => {
    return !availableDates.map(({ week_day }) => week_day).includes(weekday)
  })

  /* 
    Selects the number of schedulings per day for a given user in a specified [month] 
    and [year], while also calculating the available scheduling time for each day. 
    It then groups the results by day and available time, and filters out any days 
    where the number of schedulings exceeds the available time.
  */
  const busyDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
    SELECT
      EXTRACT(DAY FROM S.DATE) AS date,
      COUNT(S.date) AS amount,
      ((UTI.end_in_minutes - UTI.start_in_minutes) / 60) AS size

    FROM schedulings S

    LEFT JOIN user_time_intervals UTI
      ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))

    WHERE S.user_id = ${user.id}
      AND YEAR(S.date) = ${year}
      AND MONTH(S.date) = ${month}

    GROUP BY EXTRACT(DAY FROM S.DATE),
      ((UTI.end_in_minutes - UTI.start_in_minutes) / 60)

    HAVING amount >= size
  `

  const busyDates = busyDatesRaw.map((item) => item.date)

  return res.json({ unscheduledDates, busyDates })
}
