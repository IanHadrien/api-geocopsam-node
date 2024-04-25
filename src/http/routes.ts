import { type FastifyInstance } from 'fastify'
import { CreateUser } from './controllers/user/create-user'
import { CreateCultivation } from './controllers/cultivation/create-cultivation'

export async function appRoutes (app: FastifyInstance) {
  // Users
  app.post('/users', CreateUser)

  // Cultivation
  app.post('/cultivations', CreateCultivation)
}
