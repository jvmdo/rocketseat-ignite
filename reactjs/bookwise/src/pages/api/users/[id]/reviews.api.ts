/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { calculateBookRating } from '@/utils/calculate-rating'
import { formatCategories } from '@/utils/format-categories'
import { columnsToCamelCase } from '@/utils/record-case'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const userId = String(req.query.id)
  const { search } = req.query

  let text

  if (typeof search === 'string') {
    text = String(search)
  }

  try {
    const userReviewsData = await findUserReviewsData(userId, text)

    const userReviews = formatData(userReviewsData)

    return res.status(200).json(userReviews)
  } catch (error) {
    return res.status(404).json({ message: 'User does not exist' })
  }
}

async function findUserReviewsData(userId: string, text: string | undefined) {
  let userReviewsData

  try {
    userReviewsData = await prisma.review.findMany({
      where: {
        AND: [
          { user_id: userId },
          {
            OR: [
              {
                description: {
                  contains: text,
                },
              },
              {
                book: {
                  name: {
                    contains: text,
                  },
                },
              },
              {
                book: {
                  author: {
                    contains: text,
                  },
                },
              },
            ],
          },
        ],
      },
      select: {
        id: true,
        created_at: true,
        description: true,
        rate: true,
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
    })
  } catch (error) {
    console.error({ ERROR_USER_REVIEWS: error })
    throw error
  }

  return userReviewsData
}

type UserReviewsData = Awaited<ReturnType<typeof findUserReviewsData>>

function formatData(userReviewsData: UserReviewsData) {
  return userReviewsData.map(
    ({ book: { categories, reviews, ...book }, ...review }) => ({
      ...columnsToCamelCase(review),
      book: {
        ...columnsToCamelCase(book),
        categories: formatCategories(categories),
        rating: calculateBookRating(reviews),
        totalReviews: reviews.length,
      },
    }),
  )
}
