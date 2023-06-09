/* eslint-disable camelcase */
import { EReviewGroup, EUserReview } from '@/@types/entities'
import { prisma, reviewsAndCategories } from '@/lib/prisma'
import { calculateBookRating } from '@/utils/calculate-rating'
import { formatCategories } from '@/utils/format-categories'
import { columnsToCamelCase } from '@/utils/record-case'
import dayjs from 'dayjs'

interface FetchUserReviewsProps {
  id: string
  text?: string | undefined
}

export async function fetchUserReviews(
  params: FetchUserReviewsProps,
): Promise<EReviewGroup[]> {
  const userReviewsData = await findUserReviewsData(params)
  const userReviews = formatData(userReviewsData)

  return groupReviewsByInterval(userReviews)
}

async function findUserReviewsData({ id, text }: FetchUserReviewsProps) {
  let userReviewsData

  try {
    userReviewsData = await prisma.review.findMany({
      where: {
        AND: [
          { user_id: id },
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
          include: reviewsAndCategories,
        },
      },
      orderBy: {
        created_at: 'desc',
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
    ({
      book: { categories, reviews, created_at: bookCreatedAt, ...book },
      created_at,
      ...review
    }) => ({
      ...columnsToCamelCase(review),
      createdAt: String(created_at),
      book: {
        ...columnsToCamelCase(book),
        createdAt: String(bookCreatedAt),
        categories: formatCategories(categories),
        rating: calculateBookRating(reviews),
        totalReviews: reviews.length,
      },
    }),
  )
}

function groupReviewsByInterval(userReviews: EUserReview[]) {
  const intervals = ['Hoje', 'Nesta semana', 'Neste mês', 'Há mais de um mês']

  const groups: EReviewGroup[] = intervals.map((interval) => ({
    interval,
    reviews: [],
  }))

  const now = dayjs()

  for (const review of userReviews) {
    const diff = now.diff(new Date(review.createdAt), 'days')

    // eslint-disable-next-line prettier/prettier
    const index = diff === 0 ? 0 :
                  diff <=  7 ? 1 :
                  diff <= 30 ? 2 :
                               3;

    groups[index].reviews.push(review)
  }

  return groups
}
