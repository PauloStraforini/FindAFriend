export class PetNotFoundError extends Error {
  constructor() {
    super('This pet Not Found')
  }
}
