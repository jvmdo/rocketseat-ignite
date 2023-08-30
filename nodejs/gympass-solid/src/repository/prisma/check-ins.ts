import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInsRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class CheckInsRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        userId,
      },
    })

    return count
  }

  async findById(checkInId: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDate = dayjs(date).startOf('date')
    const endOfDate = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startOfDate.toDate(),
          lte: endOfDate.toDate(),
        },
      },
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIn = await prisma.checkIn.findMany({
      skip: (page - 1) * 20,
      take: 20,
      where: {
        userId,
      },
    })

    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      data,
      where: {
        id: data.id,
      },
    })

    return checkIn
  }
}
