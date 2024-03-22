export class CustomError extends Error {
  public code?: string;

  constructor(message?: string, code?: string, name?: string, stack?: string) {
    super(message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CustomError.prototype);
    this.code = code;
    this.name = name ?? "";
    this.stack = stack;
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
      name: this.name,
      stack: this.stack,
    };
  }
}
