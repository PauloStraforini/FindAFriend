import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByRgaOrMicrochip(rga: string, microchip: string): Promise<Pet | null>
}
