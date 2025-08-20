import { FastifyInstance } from 'fastify'

import { create } from './create-pets'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', create)
}
