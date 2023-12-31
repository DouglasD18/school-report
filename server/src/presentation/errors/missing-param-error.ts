export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = "MissingParamError";
    this.message = `'${paramName}' is required!`;
  }
}
