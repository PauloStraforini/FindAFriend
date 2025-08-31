// src/repositories/prisma/prisma-pets-repository.ts

import { Prisma, Pet } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const user = await prisma.pet.create({
      data,
    })
    return user
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.pet.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async updateById(id: string, data: Prisma.PetUpdateInput): Promise<Pet> {
    return prisma.pet.update({
      where: { id },
      data,
    })
  }

  async findById(id: string) {
    const user = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async deleteById(id: string): Promise<Pet | null> {
    try {
      const deletedPets = await prisma.pet.delete({
        where: { id },
      })
      return deletedPets
    } catch (error) {
      return null
    }
  }

  async findByMicrochip(microchip: string) {
    const user = this.items.find((item) => item.microchip === microchip)

    if (!user) {
      return null
    }

    return user
  }

  async findByRga(rga: string) {
    const user = this.items.find((item) => item.rga === rga)

    if (!user) {
      return null
    }

    return user
  }
}
