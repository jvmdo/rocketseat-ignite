import { fetchCategories } from '@/services/fetch-categories'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const categories = await fetchCategories()

    return res.status(200).json(categories)
  } catch (error) {
    return res.status(500).json(error)
  }
}
