import { type FastifyInstance } from 'fastify'
import { CreateUser } from './controllers/user/create-user'

export async function appRoutes (app: FastifyInstance) {
  app.post('/users', CreateUser)
}
