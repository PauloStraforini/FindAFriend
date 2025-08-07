import { PetAlreadyExistsError } from '../errors/pet-already-exist-error'
import { PetsRepository } from '../../repositories/pets-repository'
import { Pet, Prisma, TYPE, SEX } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

interface CreatePetUseCaseRequest {
  name: string
  rga: string
  dateOfBirth: Date
  age: string
  sex: SEX
  type: TYPE
  breed: string
  weight: Decimal
  weightClass: string
  primaryColor: string
  about: string
  microchip: string
  dateOfApplication: Date
  veterinarian: string
  manufacturerOfMicrochip: string
  socialName: string
  origin: string
  housing: string
  characteristics: string
  orgId: string
  tutorsId?: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    about,
    age,
    breed,
    characteristics,
    dateOfApplication,
    dateOfBirth,
    housing,
    manufacturerOfMicrochip,
    microchip,
    name,
    orgId,
    origin,
    primaryColor,
    rga,
    sex,
    socialName,
    type,
    veterinarian,
    weight,
    weightClass,
    tutorsId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const existingPet = await this.petsRepository.findByRgaOrMicrochip(
      microchip,
      rga,
    )

    if (existingPet) {
      throw new PetAlreadyExistsError()
    }

    const petData: Prisma.PetCreateInput = {
      about,
      age,
      breed,
      characteristics,
      dateOfApplication,
      dateOfBirth,
      housing,
      manufacturerOfMicrochip,
      microchip,
      name,
      origin,
      primaryColor,
      rga,
      sex,
      socialName,
      type,
      veterinarian,
      weight,
      weightClass,
      event: {
        connect: { id: orgId },
      },
      Tutors: tutorsId
        ? {
            connect: { id: tutorsId },
          }
        : undefined,
    }

    const pet = await this.petsRepository.create(petData)

    return {
      pet,
    }
  }
}
