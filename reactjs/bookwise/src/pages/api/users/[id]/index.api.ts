/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
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

  try {
    const userProfileData = await getUserProfileData(userId)

    const userProfile = formatData(userProfileData)

    return res.status(200).json(userProfile)
  } catch (error) {
    return res.status(404).json({ message: 'User does not exist' })
  }
}

async function getUserProfileData(userId: string) {
  let userProfileData

  try {
    userProfileData = await prisma.user.findUniqueOrThrow({
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
  } catch (error) {
    console.error({ ERROR_USER_ID: error })
    throw error
  }

  return userProfileData
}

type UserProfileData = Awaited<ReturnType<typeof getUserProfileData>>

function formatData(userProfileData: UserProfileData) {
  const { reviews, ...user } = userProfileData
  return {
    ...columnsToCamelCase(user),
    favoriteCategory: findFavoriteCategory(userProfileData),
    totalReadAuthors: countReadAuthors(userProfileData),
    totalReadPages: countReadPages(userProfileData),
    totalReviews: userProfileData.reviews.length,
  }
}

function countReadPages(userProfileData: UserProfileData) {
  return userProfileData.reviews.reduce((acc, review) => {
    return acc + review.book.total_pages
  }, 0)
}

function countReadAuthors(userProfileData: UserProfileData) {
  return Array.from(
    new Set(
      userProfileData.reviews.map((review) => {
        return review.book.author
      }),
    ),
  ).length
}

function findFavoriteCategory(userProfileData: UserProfileData) {
  if (userProfileData.reviews.length === 0) {
    return null
  }

  const categories = userProfileData.reviews
    .map((review) =>
      review.book.categories.map(({ category }) => category.name),
    )
    .flat()

  return Array.from(new Set(categories))
    .map((pivot) => categories.filter((category) => category === pivot))
    .sort((a, b) => b.length - a.length)[0][0]
}
