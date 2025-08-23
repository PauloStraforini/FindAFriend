import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { PetNotFoundError } from '../../../use-cases/errors/pet-not-found-error'
import { makeDeletePetsUseCase } from '../../../use-cases/factories/make-delete-pets-use-case'

export async function deleted(request: FastifyRequest, reply: FastifyReply) {
  const deletePetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deletePetParamsSchema.parse(request.params)

  try {
    const deletePetUseCase = makeDeletePetsUseCase()

    await deletePetUseCase.execute({ id })
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}
