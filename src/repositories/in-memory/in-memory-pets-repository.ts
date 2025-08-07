import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements PetsRepository {
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

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      breed: data.breed,
      castrated: data.castrated,
      characteristics: data.characteristics,
      dateOfApplication: data.dateOfApplication,
      housing: data.housing,
      manufacturerOfMicrochip: data.manufacturerOfMicrochip,
      microchip: data.microchip,
      orgId: data.orgId,
      origin: data.origin,
      primaryColor: data.primaryColor,
      rga: data.rga,
      sex: data.sex as 'MALE' | 'FAMALE' | 'OTHER',
      socialName: data.socialName,
      tutorsId: data.Tutors,
      type: data.type as 'DOG' | 'CAT',
      veterinarian: data.veterinarian,
      weight: data.weight,
      weightClass: data.weightClass,
      dateOfBirth: new Date(data.dateOfBirth),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
