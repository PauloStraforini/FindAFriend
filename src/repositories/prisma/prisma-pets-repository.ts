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
