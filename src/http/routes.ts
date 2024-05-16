import { type FastifyInstance } from 'fastify'
import { CreateUser } from './controllers/user/create-user'
import { CreateCultivation } from './controllers/cultivation/create-cultivation'
import { GetUser } from './controllers/user/get-user'
import { UpdateUser } from './controllers/user/update-user'

export async function appRoutes (app: FastifyInstance) {
  // Users
  app.post('/users', CreateUser)
  app.get('/users', GetUser)
  app.put('/users/:id', UpdateUser)

  // Cultivation
  app.post('/cultivations', CreateCultivation)
}
