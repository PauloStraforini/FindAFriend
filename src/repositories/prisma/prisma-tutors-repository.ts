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

  async findById(id: string) {
    const user = await prisma.tutors.findUnique({
      where: {
        id,
      },
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

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.username.includes(query))
      .slice((page - 1) * 20, page * 20)
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

  async deleteById(id: string): Promise<Tutors | null> {
    try {
      const deletedTutors = await prisma.tutors.delete({
        where: { id },
      })
      return deletedTutors
    } catch (error) {
      return null
    }
  }

  async findByUniqueCard(uniqueCard: string) {
    const user = this.items.find((item) => item.uniqueCard === uniqueCard)

    if (!user) {
      return null
    }

    return user
  }
}
