import { FastifyInstance } from 'fastify'
import { registerUser } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { petsRegister } from './controllers/pets-register'
import { tutorRegister } from './controllers/tutors-register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/sessions', authenticate)
  app.post('/pets', petsRegister)
  app.post('/tutors', tutorRegister)
}
