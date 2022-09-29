export class InvalidDataError extends Error {
  public data: Record<string, unknown>
  public propertyName: string
  constructor(data: Record<string, unknown>, propertyName: string) {
    super(`invalid ${propertyName} data`)
    this.data = data
    this.propertyName = propertyName
  }

  static throwIfInvalidProperty(data: Record<string, unknown>, propertyName: string): void {
    // eslint-disable-next-line no-prototype-builtins
    if (!data.hasOwnProperty(propertyName)) {
      throw new InvalidDataError(data, propertyName)
    }
  }
}
