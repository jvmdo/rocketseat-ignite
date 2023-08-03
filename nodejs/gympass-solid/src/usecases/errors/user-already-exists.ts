export class UserAlreadyExistsError extends Error {
  private _code = 409

  constructor() {
    super('Email already in use.')
  }

  public get code() {
    return this._code
  }
}
