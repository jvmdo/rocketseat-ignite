/* eslint-disable camelcase */
import { EBook } from '@/@types/entities'
import { prisma, reviewsAndCategories } from '@/lib/prisma'
import { calculateBookRating } from '@/utils/calculate-rating'
import { formatCategories } from '@/utils/format-categories'
import { columnsToCamelCase } from '@/utils/record-case'
import { Shelf } from '@prisma/client'

interface FetchBooksProps {
  text?: string
  tags?: string | string[]
  limit?: number
  userId?: string
}

export async function fetchBooks(params?: FetchBooksProps): Promise<EBook[]> {
  const booksData = await findBooksData(params)

  return formatData(booksData)
}

async function findBooksData(params: FetchBooksProps = {}) {
  const { text, tags, limit, userId } = params

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
  return booksData.map(
    ({ categories, reviews, shelves, created_at, ...book }) => ({
      ...columnsToCamelCase(book),
      createdAt: String(created_at),
      categories: formatCategories(categories),
      userHasRead: isBookInUserShelf(shelves),
      rating: calculateBookRating(reviews),
      totalReviews: reviews.length,
    }),
  )
}

function isBookInUserShelf(shelves: Array<Shelf>) {
  // If the user has read a book, Shelves contains at least 1 Shelf
  return shelves.length > 0
}
