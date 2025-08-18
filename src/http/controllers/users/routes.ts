import { FastifyInstance } from 'fastify'
import { registerUser } from './register'
import { authenticate } from './authenticate'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { profile } from './profile'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/sessions', authenticate)

  /** Authenticate */

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
