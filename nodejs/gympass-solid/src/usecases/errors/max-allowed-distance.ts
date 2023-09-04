export class MaxAllowedDistanceError extends Error {
  private _statusCode = 403

  constructor(message = 'Max allowed distance reached') {
    super(message)
  }

  public get statusCode() {
    return this._statusCode
  }
}
