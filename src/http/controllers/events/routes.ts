import { FastifyInstance } from 'fastify'

import { search } from './search-events'
import { create } from './create-events'
import { deleted } from './delete-events'
import { update } from './update-events'

export async function eventsRoutes(app: FastifyInstance) {
  app.get('/events/search', search)
  app.post('/events', create)
  app.delete('/events/:id', deleted)
  app.put('/events/:id', update)
}
