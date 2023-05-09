/* eslint-disable camelcase */
import { PrismaClient } from '@prisma/client'
import { books } from './constants/books'
import { categories } from './constants/categories'
import { ratings } from './constants/ratings'
import { users } from './constants/users'
import { shelves } from './constants/shelves'
const prisma = new PrismaClient()

async function main() {
  await prisma.rating.deleteMany()
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

  const ratingsSeed = ratings.map((rating) => {
    return prisma.rating.create({
      data: {
        id: rating.id,
        rate: rating.rate,
        description: rating.description,
        user: {
          connect: { id: rating.user_id },
        },
        book: {
          connect: { id: rating.book_id },
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
    ...ratingsSeed,
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
