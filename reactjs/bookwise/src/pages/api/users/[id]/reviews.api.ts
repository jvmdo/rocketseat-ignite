/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import { EReviewGroup, EUserReview } from '@/@types/entities'
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

    const userReviews: EUserReview[] = formatData(userReviewsData)
    const userReviewsGrouped = groupReviewsByInterval(userReviews)

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
      orderBy: {
        created_at: 'desc'
      }
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

function groupReviewsByInterval(userReviews: EUserReview[]) {
    const groups = Array.from(
      { length: 4 }, // Groups: Today, This Week, This Month, Older
      (): EReviewGroup => ({}),
    )

    const makeGroup = (interval: string, review: EUserReview, index: number): EReviewGroup => ({
      interval,
      reviews: [...(groups[index]?.reviews ?? []), review],
    });

    const now = dayjs()

    for (const review of userReviews) {
      const diff = now.diff(new Date(review.createdAt), 'days')

      const index = diff === 0 ? 0 :
                    diff <=  7 ? 1 :
                    diff <= 30 ? 2 :
                                 3;

      const interval = diff === 0 ? 'Hoje' : 
                       diff <=  7 ? 'Nesta semana' : 
                       diff <= 30 ? 'Neste mês' : 
                                    'Há mais de um mês'

      groups[index] = makeGroup(interval, review, index)
    }

    return groups
}
