import { Attachment, ExternalType } from '@prisma/client'
import { AttachmentAlreadyExistsError } from '../errors/attachment-already-exist-error'

interface AttachmentUseCaseRequest {
  filename: string
  url: string
  externalId: string
  externalType: 'User' | 'Pet' | 'Tutor'
}

interface AttachmentUseCaseResponse {
  attachment: Attachment
}

interface AttachmentRepository {
  findByExternalIdAndType(
    externalId: string,
    externalType: ExternalType,
  ): Promise<Attachment | null>
  create(data: {
    filename: string
    url: string
    externalId: string
    externalType: ExternalType
  }): Promise<Attachment>
}

export class AttachmentUseCase {
  constructor(private attachmentRepository: AttachmentRepository) {}

  async execute({
    filename,
    url,
    externalId,
    externalType,
  }: AttachmentUseCaseRequest): Promise<AttachmentUseCaseResponse> {
    const existingAttachment =
      await this.attachmentRepository.findByExternalIdAndType(
        externalId,
        externalType,
      )

    if (existingAttachment) {
      throw new AttachmentAlreadyExistsError()
    }

    const attachment = await this.attachmentRepository.create({
      filename,
      url,
      externalId,
      externalType,
    })

    return {
      attachment,
    }
  }
}
