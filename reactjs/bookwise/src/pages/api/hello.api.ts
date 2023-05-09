/* eslint-disable camelcase */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  let shelf

  try {
    shelf = await prisma.shelf.findFirst({
      orderBy: {
        updated_at: 'desc',
      },
      select: {
        updated_at: true,
        user: {
          select: {
            name: true,
          },
        },
        book: {
          select: {
            name: true,
            cover_url: true,
            summary: true,
          },
        },
      },
    })
  } catch (error) {
    return res.status(500).json({ message: 'Could not retrieve shelf', error })
  }

  const data = {
    bookName: shelf?.book.name,
    bookCover: shelf?.book.cover_url,
    bookSummary: shelf?.book.summary,
    userName: shelf?.user.name,
    updatedAt: shelf?.updated_at,
  }

  return res.status(200).json(data)
}
