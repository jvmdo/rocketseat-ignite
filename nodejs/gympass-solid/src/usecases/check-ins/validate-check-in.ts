import { CheckInsRepository } from '@/repository/in-memory/check-ins'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from '../errors/late-check-in-validation-error'

interface IValidateCheckInUseCase {
  checkInId: string
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({ checkInId }: IValidateCheckInUseCase) {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const elapsedTimeFromCheckInCreationInMinutes = dayjs(new Date()).diff(
      checkIn.createdAt,
      'minutes',
    )

    if (elapsedTimeFromCheckInCreationInMinutes > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validatedAt = new Date()

    return checkIn
  }
}
