import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const reviewsAndCategories = {
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
}
