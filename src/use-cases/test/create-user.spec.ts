import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './create-user'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exist-errors'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register User Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      username: 'Paulo Straforini',
      email: 'paula@example.com',
      cpf: '12345678910',
      registration: 'ABC113',
      password: 'securePass123',
      dateOfBirth: new Date('1990-01-01'),
      position: 'ADMIN',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not ne able to register with same email twice', async () => {
    const email = 'paulo@example.com'

    await sut.execute({
      username: 'Paulo Straforini',
      email,
      cpf: '12345678910',
      registration: 'ABC113',
      password: 'securePass123',
      dateOfBirth: new Date('1990-01-01'),
      position: 'ADMIN',
    })

    await expect(() =>
      sut.execute({
        username: 'Paulo Straforini',
        email,
        cpf: '12345678910',
        registration: 'ABC113',
        password: 'securePass123',
        dateOfBirth: new Date('1990-01-01'),
        position: 'ADMIN',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not ne able to register with same cpf twice', async () => {
    const cpf = '12345678910'

    await sut.execute({
      username: 'Paulo Straforini',
      email: 'paula@example.com',
      cpf,
      registration: 'ABC113',
      password: 'securePass123',
      dateOfBirth: new Date('1990-01-01'),
      position: 'ADMIN',
    })

    await expect(() =>
      sut.execute({
        username: 'Paulo Straforini',
        email: 'paula@example.com',
        cpf,
        registration: 'ABC113',
        password: 'securePass123',
        dateOfBirth: new Date('1990-01-01'),
        position: 'ADMIN',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not ne able to register with same registration twice', async () => {
    const registration = 'paulo@example.com'

    await sut.execute({
      username: 'Paulo Straforini',
      email: 'paula@example.com',
      cpf: '12345678910',
      registration,
      password: 'securePass123',
      dateOfBirth: new Date('1990-01-01'),
      position: 'ADMIN',
    })

    await expect(() =>
      sut.execute({
        username: 'Paulo Straforini',
        email: 'paula@example.com',
        cpf: '12345678910',
        registration,
        password: 'securePass123',
        dateOfBirth: new Date('1990-01-01'),
        position: 'ADMIN',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
