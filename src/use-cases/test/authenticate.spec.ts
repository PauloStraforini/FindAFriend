import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

let authenticateRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    authenticateRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(authenticateRepository)
  })

  it('should be able to authenticate', async () => {
    await authenticateRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12345678901',
      registration: '1234453',
      dateOfBirth: new Date('1990-01-01'),
      position: 'USER',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      cpf: '12345678901',
      registration: '1234453',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await authenticateRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12345678901',
      registration: '1234453',
      dateOfBirth: new Date('1990-01-01'),
      position: 'USER',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'wrong@example.com',
        cpf: '12345678901',
        registration: '1234453',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await authenticateRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12345678901',
      registration: '1234453',
      dateOfBirth: new Date('1990-01-01'),
      position: 'USER',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        cpf: '12345678901',
        registration: '1234453',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
