/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { calculateBookRating } from '@/utils/calculate-rating'
import { formatCategories } from '@/utils/format-categories'
import { columnsToCamelCase } from '@/utils/record-case'
import { NextApiRequest, NextApiResponse } from 'next'
import { ZodError, z } from 'zod'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method
  const userId = String(req.query.id)

  try {
    switch (method) {
      case 'GET': {
        const userLastReadData = await findUserLastReadData(userId)

        if (!userLastReadData) {
          return res.status(204).end()
        }

        const userLastRead = formatData(userLastReadData)

        return res.status(200).json(userLastRead)
      }

      case 'PUT': {
        // TODO: check for authentication
        const bookId = z.string().uuid().parse(req.body.bookId)
        const userShelf = await createOrUpdateUserShelf(userId, bookId)
        console.warn(userShelf)
        return res.status(201).json(userShelf)
      }

      default: {
        return res.status(405).json({ message: 'Method not allowed' })
      }
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Improper UUID format' })
    }
    // PrismaClientValidationError
    return res.status(404).json({ message: 'User or Book does not exist' })
  }
}

async function findUserLastReadData(userId: string) {
  let userLastReadData

  try {
    userLastReadData = await prisma.shelf.findFirst({
      where: {
        user_id: userId,
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

async function createOrUpdateUserShelf(userId: string, bookId: string) {
  try {
    return await prisma.shelf.upsert({
      where: {
        user_id_book_id: {
          user_id: userId,
          book_id: bookId,
        },
      },
      create: {
        user: {
          connect: {
            id: userId,
          },
        },
        book: {
          connect: {
            id: bookId,
          },
        },
      },
      update: {}, // update_at field is auto updated
    })
  } catch (error) {
    console.error({ ERROR_USER_LAST_READ: error })
    throw error
  }
}
