/* eslint-disable camelcase */
import { EBookReview } from '@/@types/entities'
import { prisma } from '@/lib/prisma'
import { columnsToCamelCase } from '@/utils/record-case'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth].api'
import { z } from 'zod'

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
  const method = req.method

  try {
    switch (method) {
      case 'GET': {
        const bookId = String(req.query.id)
        const bookReviewsData = await findBookReviewsData(bookId)
        const bookReviews: EBookReview[] = formatData(bookReviewsData)

        return res.status(200).json(bookReviews)
      }

      case 'POST': {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
          return res.status(401).end()
        }

        const body = ReviewBodySchema.parse(req.body)
        const newReview = await createReview(body)

        return res.status(201).json(newReview)
      }

      default: {
        return res.status(405).json({ message: 'Method not allowed' })
      }
    }
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

async function createReview(body: ReviewBody) {
  let newReview

  try {
    newReview = await prisma.review.create({
      data: {
        rate: body.rate,
        description: body.description,
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
