import { compare } from 'bcryptjs'
import { UsersRepository } from '../../repositories/users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { User } from '@prisma/client'

interface AuthenticateUseCaseResquest {
  registration: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    registration,
    password,
  }: AuthenticateUseCaseResquest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmailCpfOrRegistration(
      registration,
      password,
      registration,
    )

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPassowordMatches = await compare(password, user.password)

    if (!doesPassowordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
