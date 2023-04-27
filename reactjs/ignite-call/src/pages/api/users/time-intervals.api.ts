/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const TimeIntervalsSchema = z.object({
  intervals: z.array(
    z.object({
      weekday: z.number(),
      startInMinutes: z.number(),
      endInMinutes: z.number(),
    }),
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  try {
    const { intervals } = TimeIntervalsSchema.parse(req.body)

    await Promise.all(
      intervals.map((interval) => {
        return prisma.userTimeInterval.create({
          data: {
            week_day: interval.weekday,
            start_in_minutes: interval.startInMinutes,
            end_in_minutes: interval.endInMinutes,
            user_id: session.user?.id,
          },
        })
      }),
    )
  } catch (error) {
    return res.status(404).send({
      message: 'Body data must be an object with a intervals property',
      error,
    })
  }

  return res.status(201).end()
}
