class WeakPasswordError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, WeakPasswordError);
    }
  }
}

export { WeakPasswordError };
