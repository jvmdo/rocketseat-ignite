import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class CheckInsRepository implements ICheckInsRepository {
  private checkIns: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: data.id ?? randomUUID(),
      userId: data.userId,
      gymId: data.gymId,
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
      createdAt: new Date(),
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async findById(checkInId: string) {
    const checkIn = this.checkIns.find((checkIn) => checkIn.id === checkInId)

    return checkIn ?? null
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDate = dayjs(date).startOf('date')
    const endOfDate = dayjs(date).endOf('date')

    const checkIn = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt)
      const isOnSameDay =
        checkInDate.isAfter(startOfDate) && checkInDate.isBefore(endOfDate)

      return checkIn.userId === userId && isOnSameDay
    })

    return checkIn ?? null
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.checkIns
      .filter((checkIn) => checkIn.userId === userId)
      .slice((page - 1) * 20, page * 20)

    return checkIns
  }

  async countByUserId(userId: string) {
    const numberOfCheckIns = this.checkIns.filter(
      (checkIn) => checkIn.userId === userId,
    ).length

    return numberOfCheckIns
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex(({ id }) => id === checkIn.id)

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn
    }

    return checkIn
  }
}
