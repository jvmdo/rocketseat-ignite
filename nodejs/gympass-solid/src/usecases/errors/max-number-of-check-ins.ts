export class MaxNumberOfCheckInsError extends Error {
  private _code = 429

  constructor(message = 'Max number of check ins per day') {
    super(message)
  }

  public get code() {
    return this._code
  }
}
