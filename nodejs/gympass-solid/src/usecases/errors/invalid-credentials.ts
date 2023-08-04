export class InvalidCredentialsError extends Error {
  private _code = 401

  constructor(message: string) {
    super(message)
  }

  public get code() {
    return this._code
  }
}
