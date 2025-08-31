import { FastifyInstance } from 'fastify'

import { create } from './create-pets'
import { deleted } from './delete-pets'
import { search } from './search-pets'
import { update } from './update-pets'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', create)
  app.delete('/pets/:id', deleted)
  app.get('/pets/search', search)
  app.put('/pets/:id', update)
}
