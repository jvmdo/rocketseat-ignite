/* eslint-disable camelcase */
import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'
import isEmail from 'validator/lib/isEmail'
import { z } from 'zod'

const SchedulingBodySchema = z.object({
  guestName: z.string().regex(/^[a-zA-Z]+(?:['., -][a-zA-Z]+)*$/),
  guestEmail: z.string().refine((value) => isEmail(value)),
  observations: z.string().nullable(),
  date: z.string().datetime(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const parsedBody = SchedulingBodySchema.safeParse(req.body)

  if (!parsedBody.success) {
    return res.status(400).json({ message: 'Form data invalid' })
  }

  const { guestName, guestEmail, observations, date } = parsedBody.data
  const username = String(req.query.username)

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(Date.now())) {
    return res.status(400).json({ message: 'Scheduled hour already passed' })
  }

  const conflictingSchedule = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingSchedule) {
    return res.status(409).json({ message: 'Scheduled hour already booked' })
  }

  let schedule

  try {
    schedule = await prisma.scheduling.create({
      data: {
        user_id: user.id,
        name: guestName,
        email: guestEmail,
        observations,
        date,
      },
    })
  } catch (error) {
    return res.status(500).json({ message: 'Schedule not created', error })
  }

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user.id),
  })

  try {
    await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: {
        summary: `Ignite Call: ${guestName}`,
        description: observations,
        start: {
          dateTime: schedulingDate.format(),
        },
        end: {
          dateTime: schedulingDate.add(1, 'hour').format(),
        },
        attendees: [
          {
            email: guestEmail,
            displayName: guestName,
          },
        ],
        conferenceData: {
          createRequest: {
            requestId: schedule.id,
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
      },
    })
  } catch (error) {
    await prisma.scheduling.delete({
      where: { id: schedule.id },
    })

    return res.status(500).json({ message: 'Schedule not created', error })
  }

  return res.status(201).json({ message: 'Schedule created successfully' })
}
