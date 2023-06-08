/* eslint-disable camelcase */
import { prisma, reviewsAndCategories } from '@/lib/prisma'
import { calculateBookRating } from '@/utils/calculate-rating'
import { formatCategories } from '@/utils/format-categories'
import { columnsToCamelCase } from '@/utils/record-case'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { ZodError, z } from 'zod'
import { authOptions } from '../auth/[...nextauth].api'
import { EReview } from '@/@types/entities'

const ReviewBodySchema = z.object({
  bookId: z.string().uuid(),
  userId: z.string().uuid(),
  rate: z.number().min(0.5).max(5),
  description: z.string().min(1).max(450),
})

type ReviewBody = z.infer<typeof ReviewBodySchema>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      const reviewsData = await findReviewsData()

      const reviews: EReview[] = formatData(reviewsData)

      return res.status(200).json(reviews)
    } else if (req.method === 'POST') {
      const session = await getServerSession(req, res, authOptions)

      if (!session) {
        return res.status(401).end()
      }

      const body = ReviewBodySchema.parse(req.body)
      const newReview = await createReview(body)

      return res.status(201).json(newReview)
    } else {
      return res.status(405).json({ message: 'Method not allowed' })
    }
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
