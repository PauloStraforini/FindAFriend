import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../test/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
