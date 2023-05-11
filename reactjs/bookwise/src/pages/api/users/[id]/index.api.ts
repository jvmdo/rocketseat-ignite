/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const userId = String(req.query.id)

  let userProfileData

  try {
    userProfileData = await getUserProfileData(userId)
  } catch (error) {
    console.error({ ERROR_USER_ID: error })
    return res.status(404).json({ message: 'User does not exist' })
  }

  const userProfile = formatData(userProfileData)

  return res.status(200).json(userProfile)
}

async function getUserProfileData(userId: string) {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    include: {
      reviews: {
        select: {
          book: {
            select: {
              author: true,
              total_pages: true,
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
      },
    },
  })
}

type UserWithReviewsData = Awaited<ReturnType<typeof getUserProfileData>>

function formatData(userData: UserWithReviewsData) {
  return {
    id: userData.id,
    created_at: userData.created_at,
    name: userData.name,
    avatar_url: userData.avatar_url,
    reviews_quantity: userData.reviews.length,
    pages_read: countReadPages(userData),
    authors_read: countReadAuthors(userData),
    favorite_category: findFavoriteCategory(userData),
  }
}

function countReadPages(userData: UserWithReviewsData) {
  return userData.reviews.reduce((acc, review) => {
    return acc + review.book.total_pages
  }, 0)
}

function countReadAuthors(userData: UserWithReviewsData) {
  return Array.from(
    new Set(
      userData.reviews.map((review) => {
        return review.book.author
      }),
    ),
  ).length
}

function findFavoriteCategory(userData: UserWithReviewsData) {
  if (userData.reviews.length === 0) {
    return null
  }

  const categories = userData.reviews
    .map((review) =>
      review.book.categories.map(({ category }) => category.name),
    )
    .flat()

  return Array.from(new Set(categories))
    .map((pivot) => categories.filter((category) => category === pivot))
    .sort((a, b) => b.length - a.length)[0][0]
}
