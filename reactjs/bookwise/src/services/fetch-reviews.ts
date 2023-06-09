/* eslint-disable camelcase */
import { EReview } from '@/@types/entities'
import { prisma, reviewsAndCategories } from '@/lib/prisma'
import { calculateBookRating } from '@/utils/calculate-rating'
import { formatCategories } from '@/utils/format-categories'
import { columnsToCamelCase } from '@/utils/record-case'

export async function fetchReviews(): Promise<EReview[]> {
  const reviewsData = await findReviewsData()

  return formatData(reviewsData)
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
      user: { created_at: userCreatedAt, ...user },
      book: { categories, reviews, created_at: bookCreatedAt, ...book },
    }) => ({
      id,
      createdAt: String(created_at),
      description,
      rate,
      user: {
        ...columnsToCamelCase(user),
        createdAt: String(userCreatedAt),
      },
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
