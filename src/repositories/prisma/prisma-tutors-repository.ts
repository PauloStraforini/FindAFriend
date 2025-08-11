import { Prisma, Tutors } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { TutorsRepository } from '../tutors-repository'

export class PrismaTutorsRepository implements TutorsRepository {
  public items: Tutors[] = []

  async create(data: Prisma.TutorsCreateInput) {
    const user = await prisma.tutors.create({
      data,
    })
    return user
  }

  async findByCnpj(cnpj: string) {
    const user = this.items.find((item) => item.cnpj === cnpj)

    if (!user) {
      return null
    }

    return user
  }

  async findByCpf(cpf: string) {
    const user = this.items.find((item) => item.cpf === cpf)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByUniqueCard(uniqueCard: string) {
    const user = this.items.find((item) => item.uniqueCard === uniqueCard)

    if (!user) {
      return null
    }

    return user
  }
}
