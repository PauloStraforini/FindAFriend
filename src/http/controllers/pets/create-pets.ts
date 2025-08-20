import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { PetAlreadyExistsError } from '../../../use-cases/errors/pet-already-exist-error'
import { makeRegisterPetsUseCase } from '../../../use-cases/factories/make-register-pets-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetsBodySchema = z.object({
    rga: z.string().max(15),
    name: z.string(),
    dateOfBirth: z.coerce.date().optional(),
    castrated: z.boolean().optional(),
    sex: z.enum(['MALE', 'FEMALE', 'OTHER']),
    type: z.enum(['CAT', 'DOG']),
    breed: z.string(),
    weight: z.number().optional(),
    weightClass: z.string().max(20).optional(),
    primaryColor: z.string().optional(),
    about: z.string(),

    // Identificação
    microchip: z.string().max(15).optional(),
    dateOfApplication: z.coerce.date().optional(),
    veterinarian: z.string().optional(),
    manufacturerOfMicrochip: z.string().optional(),

    // Informações adicionais
    socialName: z.string().optional(),
    origin: z.string().optional(),
    housing: z.string().optional(),
    characteristics: z.string().optional(),

    // Relacionamentos
    orgId: z.string(),
    tutorsId: z.string().optional(),
  })

  const {
    about,
    breed,
    name,
    orgId,
    rga,
    sex,
    type,
    castrated,
    characteristics,
    dateOfApplication,
    dateOfBirth,
    housing,
    manufacturerOfMicrochip,
    microchip,
    origin,
    primaryColor,
    socialName,
    tutorsId,
    veterinarian,
    weight,
    weightClass,
  } = createPetsBodySchema.parse(request.body)

  try {
    const createPetsUseCase = makeRegisterPetsUseCase()

    await createPetsUseCase.execute({
      about,
      breed,
      name,
      orgId,
      rga,
      sex,
      type,
      castrated,
      characteristics,
      dateOfApplication,
      dateOfBirth,
      housing,
      manufacturerOfMicrochip,
      microchip,
      origin,
      primaryColor,
      socialName,
      tutorsId,
      veterinarian,
      weight,
      weightClass,
      age: '',
      nameEmergencyContact: '',
      phoneNumberEmergency: '',
      cep: '',
      street: '',
      numberHouse: '',
      neighborhood: '',
      city: '',
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof PetAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
