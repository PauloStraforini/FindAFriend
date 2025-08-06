import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exist-errors'

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
  }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userExists = await this.usersRepository.findByEmailCpfOrRegistration(
      email,
      cpf,
      registration,
    )

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      username,
      registration,
      password_hash,
      dateOfBirth,
      cpf,
      email,
      position,
    })
  }
}
