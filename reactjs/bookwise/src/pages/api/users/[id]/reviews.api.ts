import { fetchUserReviews } from '@/services/fetch-user-reviews'
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

  try {
    const userReviews = await fetchUserReviews({ id: userId, text })

    return res.status(200).json(userReviews)
  } catch (error) {
    console.error(error)
    return res.status(404).json({ message: 'User does not exist' })
  }
}
