/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { calculateBookRating } from '@/utils/calculate-rating'
import { formatCategories } from '@/utils/format-categories'
import { columnsToCamelCase } from '@/utils/record-case'
import dayjs from 'dayjs'
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
    const userReviewsGrouped = groupReviewsByDate(userReviews)

    return res.status(200).json(userReviewsGrouped)
  } catch (error) {
    console.error(error)
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

type UserReviews = ReturnType<typeof formatData>

type ReviewGroup = {
  name: string | undefined
  reviews: UserReviews | undefined
}

function groupReviewsByDate(userReviews: UserReviews) {
  const groups = Array.from(
    { length: 4 }, // Groups: Today, This Week, This Month, Older
    (): ReviewGroup => ({ name: undefined, reviews: undefined }),
  )

  const group = (
    name: string,
    review: UserReviews[0],
    index: number,
  ): ReviewGroup => ({
    name,
    reviews: [...(groups[index]?.reviews ?? []), review],
  })

  const now = dayjs()

  for (const review of userReviews) {
    const diff = now.diff(new Date(review.createdAt), 'days')

    const index = diff === 0 ? 0 :
                  diff <=  7 ? 1 :
                  diff <= 30 ? 2 :
                               3;

    const name = diff === 0 ? 'Hoje' : 
                 diff <=  7 ? 'Nesta semana' : 
                 diff <= 30 ? 'Neste mês' : 
                              'Há mais de um mês'

    groups[index] = group(name, review, index)
  }

  return groups
}
