// src/repositories/prisma/prisma-pets-repository.ts

import { Prisma, Pet } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pets = await prisma.pet.create({
      data,
    })
    return pets
  }

  async updateById(id: string, data: Prisma.PetUpdateInput): Promise<Pet> {
    return prisma.pet.update({
      where: { id },
      data,
    })
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.name.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string) {
    const pets = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pets
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
    const pets = this.items.find((item) => item.microchip === microchip)

    if (!pets) {
      return null
    }

    return pets
  }

  async findByRga(rga: string) {
    const pets = this.items.find((item) => item.rga === rga)

    if (!pets) {
      return null
    }

    return pets
  }
}
