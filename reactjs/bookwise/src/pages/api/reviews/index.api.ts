/* eslint-disable camelcase */
import { prisma, reviewsAndCategories } from '@/lib/prisma'
import { calculateBookRating } from '@/utils/calculate-rating'
import { formatCategories } from '@/utils/format-categories'
import { columnsToCamelCase } from '@/utils/record-case'
import { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'
import { EReview } from '@/@types/entities'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const reviewsData = await findReviewsData()

    const reviews: EReview[] = formatData(reviewsData)

    return res.status(200).json(reviews)
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(error)
    }
    return res.status(500).json(error)
  }
}

async function findReviewsData() {
  let reviewsData

  try {
    reviewsData = await prisma.review.findMany({
      include: {
        user: true,
        book: {
          include: reviewsAndCategories,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })
  } catch (error) {
    console.error({ ERROR_GET_REVIEWS: error })
    throw error
  }

  return reviewsData
}

type ReviewsData = Awaited<ReturnType<typeof findReviewsData>>

function formatData(reviewsData: ReviewsData) {
  return reviewsData.map(
    ({
      id,
      created_at,
      description,
      rate,
      user,
      book: { categories, reviews, ...book },
    }) => ({
      id,
      createdAt: created_at,
      description,
      rate,
      user: columnsToCamelCase(user),
      book: {
        ...columnsToCamelCase(book),
        categories: formatCategories(categories),
        rating: calculateBookRating(reviews),
        totalReviews: reviews.length,
      },
    }),
  )
}
