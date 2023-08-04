import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class UsersRepository implements IUsersRepository {
  private users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    return user ?? null
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id)

    return user ?? null
  }
}
