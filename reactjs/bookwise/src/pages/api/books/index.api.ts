/* eslint-disable camelcase */
import { prisma, reviewsAndCategories } from '@/lib/prisma'
import { calculateBookRating } from '@/utils/calculate-rating'
import { formatCategories } from '@/utils/format-categories'
import { columnsToCamelCase } from '@/utils/record-case'
import { Shelf } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth].api'
import { EBook } from '@/@types/entities'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { popular, search, tags } = req.query

  let limit

  if (typeof popular === 'string') {
    limit = Number(popular)
  }

  let text

  if (typeof search === 'string') {
    text = String(search)
  }

  const session = await getServerSession(req, res, authOptions)
  const userId = session?.user.id ?? ''

  try {
    const booksData = await findBooksData(limit, text, tags, userId)

    const books: EBook[] = formatData(booksData)

    return res.status(200).json(books)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

async function findBooksData(
  limit: number | undefined,
  text: string | undefined,
  tags: string | string[] | undefined,
  userId: string,
) {
  let booksData

  try {
    booksData = await prisma.book.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                author: {
                  contains: text,
                },
              },
              {
                name: {
                  contains: text,
                },
              },
            ],
          },
          {
            categories: {
              some: {
                category: {
                  name: {
                    in: tags,
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        ...reviewsAndCategories,
        shelves: {
          where: {
            user_id: userId,
          },
        },
      },
      orderBy: [
        {
          reviews: {
            _count: 'desc',
          },
        },
        {
          shelves: {
            _count: 'desc',
          },
        },
      ],
      take: limit,
    })
  } catch (error) {
    console.error({ ERROR_GET_BOOKS: error })
    throw error
  }

  return booksData
}

type BooksData = Awaited<ReturnType<typeof findBooksData>>

function formatData(booksData: BooksData) {
  return booksData.map(({ categories, reviews, shelves, ...book }) => ({
    ...columnsToCamelCase(book),
    categories: formatCategories(categories),
    userHasRead: isBookInUserShelf(shelves),
    rating: calculateBookRating(reviews),
    totalReviews: reviews.length,
  }))
}

function isBookInUserShelf(shelves: Array<Shelf>) {
  // If the user has read a book, Shelves contains at least 1 Shelf
  return shelves.length > 0
}
