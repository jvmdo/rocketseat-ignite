/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const userId = String(req.query.id)
  const { search } = req.query

  let text

  if (typeof search === 'string') {
    text = String(search)
  }

  let userReviews

  try {
    userReviews = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      select: {
        reviews: {
          where: {
            OR: [
              {
                description: {
                  contains: text,
                },
              },
              {
                book: {
                  name: {
                    contains: text,
                  },
                },
              },
              {
                book: {
                  author: {
                    contains: text,
                  },
                },
              },
            ],
          },
          select: {
            description: true,
            rate: true,
            book: {
              select: {
                author: true,
                cover_url: true,
                name: true,
              },
            },
          },
        },
      },
    })
  } catch (error) {
    console.error({ ERROR_USER_REVIEWS: error })
    return res.status(404).json({ message: 'User does not exist' })
  }

  return res.status(200).json(userReviews)
}
