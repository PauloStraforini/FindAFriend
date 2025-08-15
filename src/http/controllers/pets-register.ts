import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../../use-cases/test/register-pets'
import { PetAlreadyExistsError } from '../../use-cases/errors/pet-already-exist-error'
import { Decimal } from '@prisma/client/runtime/library'

export async function petsRegister(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    rga: z
      .string()
      .regex(/^\d{6,15}$/, 'O RGA deve conter entre 6 e 15 dígitos'),
    name: z.string(),
    socialName: z.string().optional(),
    dateOfBirth: z.coerce.date().optional(),
    age: z.string().optional(),
    castrated: z.boolean().optional(),
    sex: z.enum(['MALE', 'FEMALE', 'OTHER']),
    type: z.enum(['CAT', 'DOG']),
    breed: z.string(),
    weight: z.coerce.number().positive().optional(),
    weightClass: z.string().max(20).optional(),
    primaryColor: z.string().optional(),
    about: z.string(),

    microchip: z.string().max(15).optional(),
    dateOfApplication: z.coerce.date().optional(),
    veterinarian: z.string().optional(),
    manufacturerOfMicrochip: z.string().optional(),

    origin: z.string().optional(),
    housing: z.string().optional(),
    characteristics: z.string().optional(),

    nameEmergencyContact: z.string(),
    phoneNumberEmergency: z
      .string()
      .regex(/^\+?\d{10,15}$/, 'Número de telefone de emergência inválido'),

    cep: z
      .string()
      .regex(/^\d{8}$/, 'CEP inválido. Deve conter 8 dígitos numéricos'),
    street: z.string(),
    numberHouse: z.string(),
    complement: z.string().optional(),
    neighborhood: z.string(),
    city: z.string(),

    tutorsId: z.string().optional(),
    orgId: z.string(),
  })

  const {
    rga,
    name,
    socialName,
    dateOfBirth,
    age,
    castrated,
    sex,
    type,
    breed,
    weight,
    weightClass,
    primaryColor,
    about,

    microchip,
    dateOfApplication,
    veterinarian,
    manufacturerOfMicrochip,

    origin,
    housing,
    characteristics,

    nameEmergencyContact,
    phoneNumberEmergency,

    cep,
    street,
    numberHouse,
    complement,
    neighborhood,
    city,

    tutorsId,
    orgId,
  } = registerBodySchema.parse(request.body)

  try {
    const petsRepository = new PrismaPetsRepository()
    const petsUseCase = new CreatePetUseCase(petsRepository)

    await petsUseCase.execute({
      rga,
      name,
      socialName: socialName ?? '',
      dateOfBirth: dateOfBirth ?? new Date(),
      age: age ?? '',
      castrated: castrated ?? false,
      sex,
      type,
      breed,
      weight: weight ? new Decimal(weight) : new Decimal(0),
      weightClass: weightClass ?? '',
      primaryColor: primaryColor ?? '',
      about,

      microchip: microchip ?? '',
      dateOfApplication: dateOfApplication ?? new Date(),
      veterinarian: veterinarian ?? '',
      manufacturerOfMicrochip: manufacturerOfMicrochip ?? '',

      origin: origin ?? '',
      housing: housing ?? '',
      characteristics: characteristics ?? '',

      nameEmergencyContact,
      phoneNumberEmergency,

      cep,
      street,
      numberHouse,
      complement: complement ?? '',
      neighborhood,
      city,

      tutorsId,
      orgId,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof PetAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
