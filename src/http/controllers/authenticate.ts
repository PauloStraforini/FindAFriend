import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../../use-cases/test/authenticate'
import { InvalidCredentialsError } from '../../use-cases/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    cpf: z.string().min(11),
    registration: z.string().min(6),
  })

  const { email, password, cpf, registration } = authenticateBodySchema.parse(
    request.body,
  )

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await authenticateUseCase.execute({
      email,
      password,
      cpf,
      registration,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
