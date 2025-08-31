import { Prisma, Tutors } from '@prisma/client'
import { TutorsRepository } from '../tutors-repository'
import { randomUUID } from 'crypto'

export class InMemoryTutorsRepository implements TutorsRepository {
  public items: Tutors[] = []

  async create(data: Prisma.TutorsUncheckedCreateInput): Promise<Tutors> {
    const tutor: Tutors = {
      id: data.id ?? randomUUID(),
      cpf: data.cpf,
      cnpj: data.cnpj ?? null,
      username: data.username,
      socialName: data.socialName ?? null,
      email: data.email ?? null,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      phoneNumber: data.phoneNumber,
      gender: data.gender, // O tipo já é 'Gender'
      uniqueCard: data.uniqueCard ?? null,
      about: data.about ?? null,
      cep: data.cep ?? null,
      street: data.street ?? null,
      numberHouse: data.numberHouse ?? null,
      complement: data.complement ?? null,
      neighborhood: data.neighborhood ?? null,
      city: data.city ?? null,
      nameEmergencyContact: data.nameEmergencyContact ?? null,
      phoneNumberEmergency: data.phoneNumberEmergency ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(tutor)

    return tutor
  }

  async findById(id: string): Promise<Tutors | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async updateById(id: string, data: Prisma.PetUpdateInput): Promise<Tutors> {
    const index = this.items.findIndex((item) => item.id === id)

    if (index === -1) {
      throw new Error('Tutors not found')
    }

    this.items[index] = {
      ...this.items[index],
      ...data,
    } as Tutors

    return this.items[index]
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.username.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findByCpf(cpf: string) {
    const user = this.items.find((item) => item.cpf === cpf)

    if (!user) {
      return null
    }

    return user
  }

  async deleteById(id: string): Promise<Tutors | null> {
    const index = this.items.findIndex((item) => item.id === id)
    if (index === -1) {
      return null
    }
    const [deletedTutors] = this.items.splice(index, 1)
    return deletedTutors
  }

  async findByUniqueCard(uniqueCard: string) {
    const user = this.items.find((item) => item.uniqueCard === uniqueCard)

    if (!user) {
      return null
    }

    return user
  }

  async findByCnpj(cnpj: string) {
    const user = this.items.find((item) => item.cnpj === cnpj)

    if (!user) {
      return null
    }

    return user
  }
}
