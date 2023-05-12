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

  try {
    const userLastReadData = await findUserLastReadData(userId)

    if (!userLastReadData) {
      return res.status(204).end()
    }

    const userLastRead = formatData(userLastReadData)

    return res.status(200).json(userLastRead)
  } catch (error) {
    return res.status(404).json({ message: 'User does not exist' })
  }
}

async function findUserLastReadData(userId: string) {
  let userLastReadData

  try {
    userLastReadData = await prisma.shelf.findFirst({
      where: {
        userId,
      },
      select: {
        updated_at: true,
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
        updated_at: 'desc',
      },
    })
  } catch (error) {
    console.error({ ERROR_USER_LAST_READ: error })
    throw error
  }

  return userLastReadData
}

type UserLastReadData = NonNullable<
  Awaited<ReturnType<typeof findUserLastReadData>>
>

function formatData(userLastReadData: UserLastReadData) {
  const {
    updated_at, // last time the shelf changed
    book: { categories, reviews, ...book },
  } = userLastReadData

  return {
    updatedAt: updated_at,
    book: {
      ...columnsToCamelCase(book),
      categories: formatCategories(categories),
      rating: calculateBookRating(reviews),
      totalReviews: reviews.length,
    },
  }
}
