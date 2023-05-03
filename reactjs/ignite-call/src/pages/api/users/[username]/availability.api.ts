/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { username, date } = req.query
  const params = [username, date]

  for (const param of params) {
    if (!param) {
      return res.status(400).json({ message: `${param} not provided` })
    }

    if (typeof param !== 'string') {
      return res.status(400).json({
        message: 'Invalid query param value type',
        error: `${param} type must be string, instead got ${typeof param}`,
      })
    }
  }

  const user = await prisma.user.findUnique({
    where: { username: username as string },
  })

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  const referenceDate = dayjs(date as string)

  if (referenceDate.endOf('day').isBefore(Date.now())) {
    return res.json({
      timeSlots: [],
      availableTimes: [],
    })
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability) {
    return res.json({ timeSlots: [], availableTimes: [] })
  }

  const { start_in_minutes, end_in_minutes } = userAvailability
  const startHour = start_in_minutes / 60
  const endHour = end_in_minutes / 60

  const timeSlots = Array.from({ length: endHour - startHour }).map((_, i) => {
    return startHour + i
  })

  const busyTimes = await prisma.scheduling.findMany({
    select: { date: true },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  const availableTimes = timeSlots.filter((time) => {
    const isTimeBusy = busyTimes.some(
      (busyTime) => busyTime.date.getHours() === time,
    )

    const isTimeInPast = referenceDate.set('hour', time).isBefore(Date.now())

    return !(isTimeBusy || isTimeInPast)
  })

  return res.json({ timeSlots, availableTimes })
}
