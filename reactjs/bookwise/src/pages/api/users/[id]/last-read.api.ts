/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { calculateBookRating } from '@/utils/calculate-rating'
import { formatCategories } from '@/utils/format-categories'
import { columnsToCamelCase } from '@/utils/record-case'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { ZodError, z } from 'zod'
import { authOptions } from '../../auth/[...nextauth].api'
import { ELastRead } from '@/@types/entities'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method
  const userId = String(req.query.id)

  try {
    switch (method) {
      case 'GET': {
        const lastReadData = await findLastReadData(userId)

        if (!lastReadData) {
          return res.status(204).end()
        }

        const lastRead: ELastRead = formatData(lastReadData)

        return res.status(200).json(lastRead)
      }

      case 'PUT': {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
          return res.status(401).end()
        }

        const bookId = z.string().uuid().parse(req.body.bookId)
        const userShelf = await createOrUpdateUserShelf(userId, bookId)
        const lastRead: ELastRead = formatData(userShelf)

        return res.status(201).json(lastRead)
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

async function findLastReadData(userId: string) {
  let lastReadData

  try {
    lastReadData = await prisma.shelf.findFirst({
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

  return lastReadData
}

type LastReadData = NonNullable<Awaited<ReturnType<typeof findLastReadData>>>

function formatData(lastReadData: LastReadData) {
  const {
    updated_at, // last time the shelf changed
    book: { categories, reviews, ...book },
  } = lastReadData

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
  // TODO: pattern is let/return variable
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
      update: {
        updated_at: new Date(),
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
    })
  } catch (error) {
    console.error({ ERROR_USER_LAST_READ: error })
    throw error
  }
}
