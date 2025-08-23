import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { PetNotFoundError } from '../../../use-cases/errors/pet-not-found-error'
import { makeUpdatePetUseCase } from '../../../use-cases/factories/make-update-pet-use-case'
import { TYPE, SEX } from '@prisma/client'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updatePetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const updatePetBodySchema = z.object({
    name: z.string().optional(),
    rga: z.string().optional(),
    dateOfBirth: z.coerce.date().optional(),
    age: z.string().optional(),
    sex: z.nativeEnum(SEX).optional(),
    type: z.nativeEnum(TYPE).optional(),
    breed: z.string().optional(),
    weight: z.number().optional(),
    weightClass: z.string().optional(),
    primaryColor: z.string().optional(),
    about: z.string().optional(),
    microchip: z.string().optional(),
    dateOfApplication: z.coerce.date().optional(),
    veterinarian: z.string().optional(),
    manufacturerOfMicrochip: z.string().optional(),
    socialName: z.string().optional(),
    origin: z.string().optional(),
    housing: z.string().optional(),
    characteristics: z.string().optional(),
    tutorsId: z.string().uuid().optional(),
    castrated: z.boolean().optional(),
    cep: z.string().min(8).optional(),
    street: z.string().optional(),
    numberHouse: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
  })

  const { id } = updatePetParamsSchema.parse(request.params)
  const updateData = updatePetBodySchema.parse(request.body)

  try {
    const updatePetUseCase = makeUpdatePetUseCase()
    const { success } = await updatePetUseCase.execute(id, updateData)

    if (success) {
      return reply.status(200).send({ message: 'Pet updated successfully' })
    }

    return reply.status(400).send({ message: 'Failed to update pet' })
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    console.error(err)
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
