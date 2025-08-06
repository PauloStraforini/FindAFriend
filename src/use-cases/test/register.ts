import { UserAlreadyExistsError } from '../errors/user-already-exist-errors'
import { UsersRepository } from '../../repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

type Position = 'ADMIN' | 'MANAGER' | 'USER'

interface RegisterUseCaseRequest {
  username: string
  registration: string
  password: string
  dateOfBirth: Date
  cpf: string
  email: string
  position: Position
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    registration,
    password,
    dateOfBirth,
    cpf,
    email,
    position,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userExists = await this.usersRepository.findByEmailCpfOrRegistration(
      email,
      cpf,
      registration,
    )

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      username,
      registration,
      password_hash,
      dateOfBirth,
      cpf,
      email,
      position,
    })

    return {
      user,
    }
  }
}
