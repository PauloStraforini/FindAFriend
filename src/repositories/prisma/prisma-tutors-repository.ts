import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { TutorsRepository } from '../tutors-repository'

export class PrismaTutorsRepository implements TutorsRepository {
  async create(data: Prisma.TutorsCreateInput) {
    const user = await prisma.tutors.create({
      data,
    })
    return user
  }

  async findByEmailCpfCnpjOruniqueCard(
    email: string,
    cpf: string,
    cnpj: string,
    uniqueCard: string,
  ) {
    const user = await prisma.tutors.findFirst({
      where: {
        OR: [{ email }, { cpf }, { cnpj }, { uniqueCard }],
      },
    })

    return user
  }
}
