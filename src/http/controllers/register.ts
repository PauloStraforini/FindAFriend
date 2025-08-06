import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { RegisterUseCase } from '../../use-cases/test/register'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '../../use-cases/errors/user-already-exist-errors'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    registration: z.string(),
    password: z.string().min(6),
    dateOfBirth: z.coerce.date(),
    cpf: z.string().min(11),
    email: z.string().email(),
    position: z.enum(['ADMIN', 'MANAGER', 'USER']),
  })

  const {
    username,
    registration,
    password,
    dateOfBirth,
    cpf,
    email,
    position,
  } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({
      username,
      registration,
      password,
      dateOfBirth,
      cpf,
      email,
      position,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
