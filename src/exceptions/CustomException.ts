export class CustomException extends Error {
  public status: number;
  public additionalInfo?: string | Record<string, any>;

  constructor(
    message: string,
    status: number = 500,
    additionalInfo?: string | Record<string, any>
  ) {
    super(message);
    this.status = status;
    this.additionalInfo = additionalInfo;
    // Ensuring that this class is recognized as an Error subclass in TypeScript
    Object.setPrototypeOf(this, CustomException.prototype);
  }
}
