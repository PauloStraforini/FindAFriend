export class AttachmentAlreadyExistsError extends Error {
  constructor() {
    super('This attachment already Exists')
  }
}
