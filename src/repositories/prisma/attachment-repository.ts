import { Prisma, Attachment } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { attachmentRepository } from '../attachment-repository'

export class PrismaAttachmentsRepository implements attachmentRepository {
  public items: Attachment[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.AttachmentCreateInput) {
    const user = await prisma.attachment.create({
      data,
    })
    return user
  }
}
