export class MaxNumberOfCheckInsError extends Error {
  private _statusCode = 429

  constructor(message = 'Max number of check-ins per day') {
    super(message)
  }

  public get statusCode() {
    return this._statusCode
  }
}
