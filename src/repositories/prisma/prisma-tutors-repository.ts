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

  async updateById(
    id: string,
    data: Prisma.TutorsUpdateInput,
  ): Promise<Tutors> {
    return prisma.tutors.update({
      where: { id },
      data,
    })
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
    const gyms = await prisma.tutors.findMany({
      where: {
        username: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
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
