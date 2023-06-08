/* eslint-disable camelcase */
import { EBookReview } from '@/@types/entities'
import { prisma } from '@/lib/prisma'
import { columnsToCamelCase } from '@/utils/record-case'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const bookId = String(req.query.id)

  try {
    const bookReviewsData = await findBookReviewsData(bookId)

    const bookReviews: EBookReview[] = formatData(bookReviewsData)

    return res.status(200).json(bookReviews)
  } catch (error) {
    return res.status(404).json({ message: 'Book does not exist' })
  }
}

async function findBookReviewsData(bookId: string) {
  let bookReviewsData

  try {
    bookReviewsData = await prisma.review.findMany({
      where: {
        book_id: bookId,
      },
      include: {
        user: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    })
  } catch (error) {
    console.error({ ERROR_GET_BOOK_REVIEWS: error })
    throw error
  }

  return bookReviewsData
}

type BookReviewsData = Awaited<ReturnType<typeof findBookReviewsData>>

function formatData(bookReviewsData: BookReviewsData) {
  return bookReviewsData.map(({ id, created_at, description, rate, user }) => ({
    id,
    createdAt: created_at,
    description,
    rate,
    user: columnsToCamelCase(user),
  }))
}
