export class ResourceNotFoundError extends Error {
  private _code = 404

  constructor(message = 'Resource not found') {
    super(message)
  }

  public get code() {
    return this._code
  }
}
