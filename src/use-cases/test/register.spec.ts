import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exist-errors'

describe('Register User Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
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
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'paulo@example.com'

    await registerUseCase.execute({
      username: 'Paulo Straforini',
      email,
      cpf: '12345678910',
      registration: 'ABC113',
      password: 'securePass123',
      dateOfBirth: new Date('1990-01-01'),
      position: 'ADMIN',
    })

    expect(() =>
      registerUseCase.execute({
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
})
