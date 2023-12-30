export class NotFoundError extends Error {
  constructor() {
    super(`Note Not Found`);
    this.name = "NotFoundError";
  }
}
