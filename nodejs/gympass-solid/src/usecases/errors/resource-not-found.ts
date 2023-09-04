export class ResourceNotFoundError extends Error {
  private _statusCode = 404

  constructor(message = 'No record found for the desired resource') {
    super(message)
  }

  public get statusCode() {
    return this._statusCode
  }
}
