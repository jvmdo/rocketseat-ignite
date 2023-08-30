export class LateCheckInValidationError extends Error {
  private _code = 400

  constructor(
    message = 'Check-in is not valid. Past the 20 minutes time window.',
  ) {
    super(message)
  }

  public get code() {
    return this._code
  }
}
