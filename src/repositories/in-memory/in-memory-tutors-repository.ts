import { Prisma, Tutors } from '@prisma/client'
import { TutorsRepository } from '../tutors-repository'
import { randomUUID } from 'crypto'

export class InMemoryTutorsRepository implements TutorsRepository {
  public items: Tutors[] = []

  async findByEmailCpfCnpjOruniqueCard(
    email: string,
    cpf: string,
    cnpj: string,
    uniqueCard: string,
  ): Promise<Tutors | null> {
    const tutor = this.items.find(
      (item) =>
        item.email === email ||
        item.cpf === cpf ||
        item.cnpj === cnpj ||
        item.uniqueCard === uniqueCard,
    )

    if (!tutor) {
      return null
    }

    return tutor
  }

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
}
