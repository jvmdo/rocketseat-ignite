import { prisma } from '@/lib/prisma'
import { Category } from '@prisma/client'

export async function fetchCategories(): Promise<string[]> {
  const categoriesData = await findCategoriesData()

  return formatCategories(categoriesData)
}

async function findCategoriesData() {
  let categories

  try {
    categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    })
  } catch (error) {
    console.error({ ERROR_CATEGORIES: error })
    throw error
  }

  return categories
}

function formatCategories(categories: Category[]) {
  return categories.map(({ name }) => name)
}
