import { Prisma, User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async findByEmailCpfOrRegistration(
    email: string,
    cpf: string,
    registration: string,
  ) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { cpf }, { registration }],
      },
    })

    return user
  }
}
