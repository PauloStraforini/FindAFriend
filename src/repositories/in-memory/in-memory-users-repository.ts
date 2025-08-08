import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmailCpfOrRegistration(
    email: string,
    cpf: string,
    registration: string,
  ): Promise<User | null> {
    const user = this.items.find(
      (item) =>
        item.email === email &&
        item.cpf === cpf &&
        item.registration === registration,
    )

    return user || null
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      username: data.username,
      email: data.email,
      cpf: data.cpf,
      registration: data.registration,
      password_hash: data.password_hash,
      dateOfBirth: new Date(data.dateOfBirth),
      position: data.position as 'ADMIN' | 'MANAGER' | 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(user)

    return user
  }
}
