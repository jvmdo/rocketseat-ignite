/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const ReviewSchema = z.object({
  bookId: z.string().uuid(),
  userId: z.string().uuid(),
  rate: z.number().min(1).max(5),
  description: z.string().min(1),
})

type ReviewData = z.infer<typeof ReviewSchema>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      const reviews = await findReviews()
      return res.status(200).json({ reviews })
    } else if (req.method === 'POST') {
      // TODO: check for user session / authentication
      const body = ReviewSchema.parse(req.body)
      const newReview = await createReview(body)
      return res.status(201).json({ newReview })
    } else {
      return res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}

async function findReviews() {
  let reviews

  try {
    reviews = await prisma.review.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
  } catch (error) {
    console.error({ ERROR_GET_REVIEWS: error })
    throw error
  }

  return reviews
}

async function createReview(body: ReviewData) {
  let review

  try {
    review = await prisma.review.create({
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

  return review
}

/* async function findUser(userId: string) {
  let user

  try {
    user = await prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
    })
  } catch (error) {
    console.log({ ERROR_FIND_USER: error })
    throw error
  }

  return user
} */

/* async function findBook(bookId: string) {
  let book

  try {
    book = await prisma.book.findFirstOrThrow({
      where: {
        id: bookId,
      },
    })
  } catch (error) {
    console.log({ ERROR_FIND_BOOK: error })
    throw error
  }

  return book
} */
