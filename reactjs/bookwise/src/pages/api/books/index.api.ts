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

  const { popular, search, tags } = req.query

  let limit

  if (typeof popular === 'string') {
    limit = Number(popular)
  }

  let text

  if (search !== undefined && typeof search === 'string') {
    text = String(search)
  }

  try {
    const booksData = await findBooksData(limit, text, tags)

    const books = formatData(booksData)

    return res.status(200).json(books)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

async function findBooksData(
  limit: number | undefined,
  text: string | undefined,
  tags: string | string[] | undefined,
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
  return booksData.map(({ categories, reviews, summary, ...book }) => ({
    ...columnsToCamelCase(book), // book without summary
    categories: formatCategories(categories),
    rating: calculateBookRating(reviews),
    totalReviews: reviews.length,
  }))
}
