import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { IUsersRepository } from '../users-repository'

export class UsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
