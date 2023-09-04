export class InvalidCredentialsError extends Error {
  private _statusCode = 401

  constructor(message = 'Invalid email and password combination.') {
    super(message)
  }

  public get statusCode() {
    return this._statusCode
  }
}
