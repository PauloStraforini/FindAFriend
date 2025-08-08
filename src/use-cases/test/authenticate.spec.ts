import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { hash } from 'bcryptjs'
import { expect, describe, it } from 'vitest'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
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
