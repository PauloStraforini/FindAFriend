import { SEX, TYPE } from '@prisma/client'
import { PetsRepository } from '../../repositories/pets-repository'

interface UpdatePetsUseCaseRequest {
  name?: string
  rga?: string
  dateOfBirth?: Date
  age?: string
  sex?: SEX
  type?: TYPE
  breed?: string
  weight?: number
  weightClass?: string
  primaryColor?: string
  about?: string
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
  nameEmergencyContact?: string
  phoneNumberEmergency?: string
  cep?: string
  street?: string
  numberHouse?: string
  complement?: string
  neighborhood?: string
  city?: string
}

interface UpdatePetsUseCaseResponse {
  success: boolean
}

export class UpdatePetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    id: string,
    updateData: UpdatePetsUseCaseRequest,
  ): Promise<UpdatePetsUseCaseResponse> {
    const petExists = await this.petsRepository.findById(id)

    if (!petExists) {
      throw new Error('Event not found')
    }

    await this.petsRepository.updateById(id, updateData)

    return { success: true }
  }
}
