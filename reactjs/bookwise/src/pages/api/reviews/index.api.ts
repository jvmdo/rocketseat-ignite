/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { calculateBookRating } from '@/utils/calculate-rating'
import { formatCategories } from '@/utils/format-categories'
import { columnsToCamelCase } from '@/utils/record-case'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const ReviewBodySchema = z.object({
  bookId: z.string().uuid(),
  userId: z.string().uuid(),
  rate: z.number().min(1).max(5),
  description: z.string().min(1),
})

type ReviewBody = z.infer<typeof ReviewBodySchema>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      const reviewsData = await findReviewsData()
      const reviews = formatReviewsData(reviewsData)
      return res.status(200).json(reviews)
    } else if (req.method === 'POST') {
      // TODO: check for user session / authentication
      const body = ReviewBodySchema.parse(req.body)
      const newReview = await createReview(body)
      return res.status(201).json({ newReview })
    } else {
      return res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}

async function findReviewsData() {
  let reviewsData

  try {
    reviewsData = await prisma.review.findMany({
      include: {
        user: true,
        book: {
          include: {
            reviews: {
              select: {
                rate: true,
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

async function createReview(body: ReviewBody) {
  let newReview

  try {
    newReview = await prisma.review.create({
      data: {
        description: body.description,
        rate: body.rate,
        user: {
          connect: {
            id: body.userId,
          },
        },
        book: {
          connect: {
            id: body.bookId,
          },
        },
      },
    })
  } catch (error) {
    console.error({ ERROR_GET_REVIEWS: error })
    throw error
  }

  return newReview
}

type ReviewsData = Awaited<ReturnType<typeof findReviewsData>>

function formatReviewsData(reviewsData: ReviewsData) {
  return reviewsData.map(
    ({
      id,
      rate,
      description,
      user,
      book: { reviews, categories, ...book },
    }) => ({
      id,
      rate,
      description,
      user,
      book: {
        ...columnsToCamelCase(book),
        rating: calculateBookRating(reviews),
        categories: formatCategories(categories),
      },
    }),
  )
}
