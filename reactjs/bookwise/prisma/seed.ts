/* eslint-disable camelcase */
import { PrismaClient } from '@prisma/client'
import { books } from './constants/books'
import { categories } from './constants/categories'
import { reviews } from './constants/reviews'
import { users } from './constants/users'
import { shelves } from './constants/shelves'
const prisma = new PrismaClient()

async function main() {
  await prisma.review.deleteMany()
  await prisma.user.deleteMany()
  await prisma.categoriesOnBooks.deleteMany()
  await prisma.category.deleteMany()
  await prisma.book.deleteMany()
  await prisma.shelf.deleteMany()

  const usersSeed = users.map((user) => {
    return prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url,
      },
    })
  })

  const categoriesSeed = categories.map((category) => {
    return prisma.category.create({
      data: {
        name: category.name,
        id: category.id,
      },
    })
  })

  const booksSeed = books.map((book) => {
    return prisma.book.create({
      data: {
        id: book.id,
        name: book.name,
        author: book.author,
        summary: book.summary,
        cover_url: book.cover_url,
        total_pages: book.total_pages,
        categories: {
          create: [
            ...book.categories.map((category) => {
              return {
                category: {
                  connect: {
                    id: category.id,
                  },
                },
              }
            }),
          ],
        },
      },
    })
  })

  const reviewsSeed = reviews.map((review) => {
    return prisma.review.create({
      data: {
        id: review.id,
        rate: review.rate,
        description: review.description,
        user: {
          connect: { id: review.user_id },
        },
        book: {
          connect: { id: review.book_id },
        },
      },
    })
  })

  const shelvesSeed = shelves.map((shelf) => {
    return prisma.shelf.create({
      data: {
        id: shelf.id,
        updated_at: new Date(shelf.updated_at),
        user: {
          connect: { id: shelf.user_id },
        },
        book: {
          connect: { id: shelf.book_id },
        },
      },
    })
  })

  await prisma.$transaction([
    ...categoriesSeed,
    ...booksSeed,
    ...usersSeed,
    ...reviewsSeed,
    ...shelvesSeed,
  ])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
