import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>

  findById(id: string): Promise<User | null>
  findByEmailCpfOrRegistration(
    email: string,
    cpf: string,
    registration: string,
  ): Promise<User | null>
}
