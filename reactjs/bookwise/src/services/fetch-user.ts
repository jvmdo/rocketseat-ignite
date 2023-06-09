/* eslint-disable camelcase */
import { EUser } from '@/@types/entities'
import { prisma } from '@/lib/prisma'
import { columnsToCamelCase } from '@/utils/record-case'

interface FetchUserProps {
  id: string
}

export async function fetchUser(params: FetchUserProps): Promise<EUser> {
  const userData = await findUserData(params)

  return formatData(userData)
}

async function findUserData({ id }: FetchUserProps) {
  let userData

  try {
    userData = await prisma.user.findUniqueOrThrow({
      where: {
        id,
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

  return userData
}

type UserData = Awaited<ReturnType<typeof findUserData>>

function formatData(userData: UserData) {
  const { reviews, emailVerified, created_at, ...user } = userData
  return {
    ...columnsToCamelCase(user), // Without [emailVerified]
    createdAt: String(created_at),
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
