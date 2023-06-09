import { fetchUser } from '@/services/fetch-user'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const userId = String(req.query.id)

  try {
    const user = await fetchUser({ id: userId })

    return res.status(200).json(user)
  } catch (error) {
    return res.status(404).json({ message: 'User does not exist' })
  }
}
