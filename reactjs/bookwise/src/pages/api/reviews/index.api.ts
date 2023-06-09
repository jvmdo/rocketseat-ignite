import { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'
import { fetchReviews } from '@/services/fetch-reviews'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const reviews = await fetchReviews()

    return res.status(200).json(reviews)
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(error)
    }
    return res.status(500).json(error)
  }
}
