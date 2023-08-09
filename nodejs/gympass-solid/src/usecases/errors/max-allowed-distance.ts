export class MaxAllowedDistanceError extends Error {
  private _code = 403

  constructor(message = 'Max allowed distance reached') {
    super(message)
  }

  public get code() {
    return this._code
  }
}
