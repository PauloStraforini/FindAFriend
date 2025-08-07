import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findByRgaOrMicrochip(
    rga: string,
    microchip: string,
  ): Promise<Pet | null> {
    const pet = this.items.find(
      (item) => item.rga === rga || item.microchip === microchip,
    )

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      rga: data.rga,
      name: data.name,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      age: data.age ?? null,
      castrated: data.castrated ?? null,
      sex: data.sex as 'MALE' | 'FEMALE' | 'OTHER',
      type: data.type as 'CAT' | 'DOG',
      breed: data.breed,
      weight: data.weight ? new Prisma.Decimal(data.weight.toString()) : null,
      weightClass: data.weightClass ?? null,
      primaryColor: data.primaryColor ?? null,
      about: data.about,
      microchip: data.microchip ?? null,
      dateOfApplication: data.dateOfApplication
        ? new Date(data.dateOfApplication)
        : null,
      veterinarian: data.veterinarian ?? null,
      manufacturerOfMicrochip: data.manufacturerOfMicrochip ?? null,
      socialName: data.socialName ?? null,
      origin: data.origin ?? null,
      housing: data.housing ?? null,
      characteristics: data.characteristics ?? null,
      orgId: data.orgId,
      tutorsId: data.tutorsId ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
