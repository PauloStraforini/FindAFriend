import { expect, describe, it, beforeEach } from 'vitest'
import { AttachmentUseCase } from './attachment'
import { attachmentRepository } from '../../repositories/attachment-repository'
import { AttachmentAlreadyExistsError } from '../errors/attachment-already-exist-error'
import { InMemoryAttachmentRepository } from '../../repositories/in-memory/in-memory-attachment-repository'

let attachmentRepository: InMemoryAttachmentRepository
let sut: AttachmentUseCase

describe('Attachment Use Case', () => {
  beforeEach(() => {
    attachmentRepository = new InMemoryAttachmentRepository()
    sut = new AttachmentUseCase(attachmentRepository)
  })

  it('should be able to create an attachment', async () => {
    const { attachment } = await sut.execute({
      filename: 'foto.jpg',
      url: 'https://meubucket.com/foto.jpg',
      externalId: 'user-123',
      externalType: 'User',
    })

    expect(attachment.id).toEqual(expect.any(String))
    expect(attachment.filename).toBe('foto.jpg')
    expect(attachment.externalId).toBe('user-123')
    expect(attachment.externalType).toBe('User')
  })

  it('should not be able to create duplicate attachment for same externalId and externalType', async () => {
    await sut.execute({
      filename: 'foto.jpg',
      url: 'https://meubucket.com/foto.jpg',
      externalId: 'user-123',
      externalType: 'User',
    })

    await expect(() =>
      sut.execute({
        filename: 'foto.jpg',
        url: 'https://meubucket.com/foto.jpg',
        externalId: 'user-123',
        externalType: 'User',
      }),
    ).rejects.toBeInstanceOf(AttachmentAlreadyExistsError)
  })
})
