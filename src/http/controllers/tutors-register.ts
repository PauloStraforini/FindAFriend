import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaTutorsRepository } from '../../repositories/prisma/prisma-tutors-repository'
import { CreateTutorUseCase } from '../../use-cases/test/create-register-tutors'
import { TutorsAlreadyExistsError } from '../../use-cases/errors/tutors-already-exist-error'

export async function tutorRegister(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    cpf: z.string().min(11),
    cnpj: z.string().min(14),
    username: z.string(),
    socialName: z.string(),
    email: z.string().email(),
    dateOfBirth: z.coerce.date(),
    phoneNumber: z
      .string()
      .regex(/^\+?\d{10,15}$/, 'Número de telefone inválido'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    uniqueCard: z
      .string()
      .regex(/^\d{11}$/, 'O número do cartão deve conter 11 dígitos'),
    cep: z
      .string()
      .regex(/^\d{8}$/, 'CEP inválido. Deve conter 8 dígitos numéricos'),
    street: z.string(),
    numberHouse: z.string(),
    complement: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    nameEmergencyContact: z.string(),
    phoneNumberEmergency: z
      .string()
      .regex(/^\+?\d{10,15}$/, 'Número de telefone de emergência inválido'),
  })

  const {
    cpf,
    cnpj,
    username,
    socialName,
    email,
    dateOfBirth,
    phoneNumber,
    gender,
    uniqueCard,
    cep,
    street,
    numberHouse,
    complement,
    neighborhood,
    city,
    nameEmergencyContact,
    phoneNumberEmergency,
  } = registerBodySchema.parse(request.body)

  try {
    const tutorsRepository = new PrismaTutorsRepository()
    const tutorsUseCase = new CreateTutorUseCase(tutorsRepository)

    await tutorsUseCase.execute({
      cpf,
      cnpj,
      username,
      socialName,
      email,
      dateOfBirth,
      phoneNumber,
      gender,
      uniqueCard,
      cep,
      street,
      numberHouse,
      complement,
      neighborhood,
      city,
      nameEmergencyContact,
      phoneNumberEmergency,
      age: '',
      about: '',
      pets: '',
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof TutorsAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
