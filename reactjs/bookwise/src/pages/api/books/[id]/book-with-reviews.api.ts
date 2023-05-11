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

  const bookId = String(req.query.id)

  let bookWithReviews

  // * There is no need to use this endpoint, since all the book data
  // * will already be in the frontend, so it could be passed as props

  try {
    bookWithReviews = await prisma.book.findUniqueOrThrow({
      where: {
        id: bookId,
      },
      select: {
        author: true,
        cover_url: true,
        name: true,
        total_pages: true,
        reviews: {
          select: {
            created_at: true,
            description: true,
            rate: true,
            user: {
              select: {
                avatar_url: true,
                name: true,
              },
            },
          },
        },
        categories: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
  } catch (error) {
    console.error({ ERROR_BOOK_ID: error })
    return res.status(404).json({ message: 'Book does not exist' })
  }

  return res.status(200).json(bookWithReviews)
}
