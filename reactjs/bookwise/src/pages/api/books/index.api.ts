import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth].api'
import { fetchBooks } from '@/services/fetch-books'

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
    const books = await fetchBooks({ text, tags, limit, userId })

    return res.status(200).json(books)
  } catch (error) {
    return res.status(500).json({ error })
  }
}
