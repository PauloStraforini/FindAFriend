import { Prisma, Attachment, ExternalType } from '@prisma/client'
import { randomUUID } from 'crypto'

export interface AttachmentRepository {
  findByExternalIdAndType(
    externalId: string,
    externalType: 'User' | 'Pet' | 'Tutor',
  ): Promise<Attachment | null>
  create(data: Prisma.AttachmentCreateInput): Promise<Attachment>
}

export class InMemoryAttachmentRepository implements AttachmentRepository {
  public items: Attachment[] = []

  async findByExternalIdAndType(
    externalId: string,
    externalType: ExternalType,
  ): Promise<Attachment | null> {
    const attachment = this.items.find(
      (item) =>
        item.externalId === externalId && item.externalType === externalType,
    )

    return attachment ?? null
  }

  async findById(id: string): Promise<Attachment | null> {
    const attachment = this.items.find((item) => item.id === id)
    return attachment ?? null
  }

  async create(data: Prisma.AttachmentCreateInput): Promise<Attachment> {
    const attachment: Attachment = {
      id: randomUUID(),
      filename: data.filename,
      url: data.url,
      externalId: data.externalId,
      externalType: data.externalType,
      createdAt: new Date(),
    }

    this.items.push(attachment)

    return attachment
  }
}
