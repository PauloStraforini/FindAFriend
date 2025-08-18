import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { search } from './search-events'
import { create } from './create-events'

export async function eventsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/events/search', search)
  app.post('/events', create)
}
