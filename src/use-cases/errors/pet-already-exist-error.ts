export class PetAlreadyExistsError extends Error {
  constructor() {
    super('This pet already Exists')
  }
}
