import { Attachment, Prisma } from '@prisma/client'

export interface attachmentRepository {
  findById(id: string): Promise<Attachment | null>
  create(data: Prisma.AttachmentCreateInput): Promise<Attachment>
}
