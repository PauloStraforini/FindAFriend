import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../test/get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const UseCase = new GetUserProfileUseCase(usersRepository)
  return UseCase
}
