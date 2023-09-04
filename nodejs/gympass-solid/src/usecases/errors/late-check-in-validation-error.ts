export class LateCheckInValidationError extends Error {
  private _statusCode = 400

  constructor(
    message = 'Check-in is not valid. Past the 20 minutes time window.',
  ) {
    super(message)
  }

  public get statusCode() {
    return this._statusCode
  }
}
