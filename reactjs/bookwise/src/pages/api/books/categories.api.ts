import { prisma } from '@/lib/prisma'
import { Category } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  let categories

  try {
    categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    })
  } catch (error) {
    console.error({ ERROR_CATEGORIES: error })
    return res.status(500).end()
  }

  const formattedCategories = formatCategories(categories)

  return res.status(200).json(formattedCategories)
}

function formatCategories(categories: Category[]) {
  return categories.map(({ name }) => name)
}
