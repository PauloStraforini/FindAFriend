import { compare } from 'bcryptjs'
import { UsersRepository } from '../../repositories/users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  cpf: string
  registration: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    cpf,
    registration,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmailCpfOrRegistration(
      email,
      cpf,
      registration,
    )

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, user.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
