import { prisma } from '@/lib/prisma'
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

  if (popular !== undefined && typeof popular === 'string') {
    limit = Number(popular)
  }

  let text

  if (typeof search === 'string') {
    text = String(search)
  }

  let books

  try {
    books = await prisma.book.findMany({
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
    console.error({ ERROR_BOOKS: error })
    return res.status(500).json({ error })
  }

  return res.status(200).json({ books })
}
