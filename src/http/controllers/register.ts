import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../../lib/prisma'
import z from 'zod'

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

  await prisma.user.create({
    data: {
      username,
      registration,
      password,
      dateOfBirth,
      cpf,
      email,
      position,
    },
  })

  return reply.status(201).send()
}
