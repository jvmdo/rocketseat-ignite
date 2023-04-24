import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).end()
  }

  const { name, username } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!userExists) {
    const user = await prisma.user.create({
      data: {
        name,
        username,
      },
    })
    res.status(201).json(user)
  } else {
    res.status(400).json({ message: 'Username already in use' })
  }
}
