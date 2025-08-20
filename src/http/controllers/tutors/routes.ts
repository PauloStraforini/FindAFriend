import { FastifyInstance } from 'fastify'

import { create } from './create-tutors'
import { search } from './search-tutors'

export async function tutorsRoutes(app: FastifyInstance) {
  app.post('/tutors', create)
  app.get('/tutors/search', search)
}
