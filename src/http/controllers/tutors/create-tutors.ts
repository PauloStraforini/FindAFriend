import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { TutorsAlreadyExistsError } from '../../../use-cases/errors/tutors-already-exist-error'
import { makeRegisterTutorsUseCase } from '../../../use-cases/factories/make-register-tutors-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTutorBodySchema = z.object({
    cpf: z.string().length(11),
    cnpj: z.string().optional(),
    username: z.string(),
    socialName: z.string().optional(),
    email: z.string().email().optional(),
    dateOfBirth: z.coerce.date().optional(),
    phoneNumber: z.string(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    uniqueCard: z.string().optional(),
    about: z.string().optional(),
    cep: z.string().length(8).optional(),
    street: z.string().optional(),
    numberHouse: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    nameEmergencyContact: z.string().optional(),
    phoneNumberEmergency: z.string().optional(),
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
    about,
    cep,
    street,
    numberHouse,
    complement,
    neighborhood,
    city,
    nameEmergencyContact,
    phoneNumberEmergency,
  } = createTutorBodySchema.parse(request.body)

  try {
    const createTutorUseCase = makeRegisterTutorsUseCase()

    await createTutorUseCase.execute({
      cpf,
      cnpj,
      username,
      socialName,
      email,
      dateOfBirth,
      phoneNumber,
      gender,
      uniqueCard,
      about,
      cep,
      street,
      numberHouse,
      complement,
      neighborhood,
      city,
      nameEmergencyContact,
      phoneNumberEmergency,
      age: '',
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
