/* eslint-disable camelcase */
import { EUser } from '@/@types/entities'
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
    const userData = await getUserData(userId)

    const user: EUser = formatData(userData)

    return res.status(200).json(user)
  } catch (error) {
    return res.status(404).json({ message: 'User does not exist' })
  }
}

async function getUserData(userId: string) {
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

type UserData = Awaited<ReturnType<typeof getUserData>>

function formatData(userData: UserData) {
  const { reviews, emailVerified, ...user } = userData
  return {
    ...columnsToCamelCase(user), // Without [emailVerified]
    favoriteCategory: findFavoriteCategory(userData),
    totalReadAuthors: countReadAuthors(userData),
    totalReadPages: countReadPages(userData),
    totalReviews: userData.reviews.length,
  }
}

function countReadPages(userData: UserData) {
  return userData.reviews.reduce((acc, review) => {
    return acc + review.book.total_pages
  }, 0)
}

function countReadAuthors(userData: UserData) {
  return Array.from(
    new Set(
      userData.reviews.map((review) => {
        return review.book.author
      }),
    ),
  ).length
}

function findFavoriteCategory(userData: UserData) {
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
