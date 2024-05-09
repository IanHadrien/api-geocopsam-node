import { type FastifyInstance } from 'fastify'
import { CreateUser } from './controllers/user/create-user'
import { CreateCultivation } from './controllers/cultivation/create-cultivation'
import { GetUser } from './controllers/user/get-user'

export async function appRoutes (app: FastifyInstance) {
  // Users
  app.post('/users', CreateUser)
  app.get('/users', GetUser)

  // Cultivation
  app.post('/cultivations', CreateCultivation)
}
