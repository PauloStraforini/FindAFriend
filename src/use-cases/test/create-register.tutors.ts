import { TutorsAlreadyExistsError } from '../errors/tutors-already-exist-error'
import { TutorsRepository } from '../../repositories/tutors-repository'
import { Tutors, Gender } from '@prisma/client'

interface CreateTutorUseCaseRequest {
  username: string
  cpf: string
  cnpj: string
  socialName: string
  email: string
  dateOfBirth: Date
  phoneNumber: string
  age: string
  gender: Gender
  uniqueCard: string
  about: string
  cep: string
  street: string
  numberHouse: string
  complement: string
  neighborhood: string
  city: string
  nameEmergencyContact: string
  phoneNumberEmergency: string
  pets: string
}

interface CreateTutorUseCaseResponse {
  tutor: Tutors
}

export class CreateTutorUseCase {
  constructor(private tutorsRepository: TutorsRepository) {}

  async execute(
    data: CreateTutorUseCaseRequest,
  ): Promise<CreateTutorUseCaseResponse> {
    const tutorExists =
      await this.tutorsRepository.findByEmailCpfCnpjOruniqueCard(
        data.email,
        data.cpf,
        data.cnpj,
        data.uniqueCard,
      )

    if (tutorExists) {
      throw new TutorsAlreadyExistsError()
    }

    const tutor = await this.tutorsRepository.create({
      username: data.username,
      cpf: data.cpf,
      cnpj: data.cnpj,
      socialName: data.socialName,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      uniqueCard: data.uniqueCard,
      about: data.about,
      cep: data.cep,
      street: data.street,
      numberHouse: data.numberHouse,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      nameEmergencyContact: data.nameEmergencyContact,
      phoneNumberEmergency: data.phoneNumberEmergency,
    })

    return {
      tutor,
    }
  }
}
