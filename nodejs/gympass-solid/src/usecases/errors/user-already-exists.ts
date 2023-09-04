export class UserAlreadyExistsError extends Error {
  private _statusCode = 409

  constructor(message = 'Email already in use.') {
    super(message)
  }

  public get statusCode() {
    return this._statusCode
  }
}
