export class MealError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number, name = 'MealError') {
    super(message)
    this.name = name
    this.statusCode = statusCode
  }
}
