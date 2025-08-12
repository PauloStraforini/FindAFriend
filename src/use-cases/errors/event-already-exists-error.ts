export class EventAlreadyExistsError extends Error {
  constructor() {
    super('This event already Exists')
  }
}
