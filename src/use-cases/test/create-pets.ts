import { PetAlreadyExistsError } from '../errors/pet-already-exist-error'
import { PetsRepository } from '../../repositories/pets-repository'
import { Pet, TYPE, SEX } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  rga: string
  dateOfBirth?: Date
  age: string
  sex: SEX
  type: TYPE
  breed: string
  weight?: number
  weightClass?: string
  primaryColor?: string
  about: string
  microchip?: string
  dateOfApplication?: Date
  veterinarian?: string
  manufacturerOfMicrochip?: string
  socialName?: string
  origin?: string
  housing?: string
  characteristics?: string
  tutorsId?: string
  castrated?: boolean
  nameEmergencyContact: string
  phoneNumberEmergency: string
  cep: string
  street: string
  numberHouse: string
  complement?: string
  neighborhood: string
  city: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const existingPet = await this.petsRepository.findByRga(data.rga)

    if (existingPet) {
      throw new PetAlreadyExistsError()
    }

    const pet = await this.petsRepository.create({
      name: data.name,
      rga: data.rga,
      dateOfBirth: data.dateOfBirth,
      age: data.age,
      sex: data.sex,
      type: data.type,
      breed: data.breed,
      weight: data.weight,
      weightClass: data.weightClass,
      primaryColor: data.primaryColor,
      about: data.about,
      microchip: data.microchip,
      dateOfApplication: data.dateOfApplication,
      veterinarian: data.veterinarian,
      manufacturerOfMicrochip: data.manufacturerOfMicrochip,
      socialName: data.socialName,
      origin: data.origin,
      housing: data.housing,
      characteristics: data.characteristics,
      tutorsId: data.tutorsId,
    })

    return {
      pet,
    }
  }
}
