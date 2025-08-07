import { Prisma, Pet } from '@prisma/client'
import { prisma } from '../../lib/prisma'

export interface PetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findByRgaOrMicrochip(rga: string, microchip?: string): Promise<Pet | null>
}

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })
    return pet
  }

  async findByRgaOrMicrochip(rga: string, microchip: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        OR: [{ rga }, { microchip }],
      },
    })

    return pet
  }
}
