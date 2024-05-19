import { type FastifyInstance } from 'fastify'
import { CreateUser } from './controllers/user/create-user'
import { CreateCultivation } from './controllers/cultivation/create-cultivation'
import { GetUser } from './controllers/user/get-user'
import { UpdateUser } from './controllers/user/update-user'
import { DeleteUser } from './controllers/user/delete-user'
import { GetCultivation } from './controllers/cultivation/get-cultivation'
import { CreateMappedArea } from './controllers/mappedArea/create-mapped-area'
import { GetMappedArea } from './controllers/mappedArea/get-mapped-area'
import { UpdateCultivation } from './controllers/cultivation/update-cultivation'
import { DeleteCultivation } from './controllers/cultivation/delete-cultivation'

export async function appRoutes (app: FastifyInstance) {
  // Users
  app.post('/users', CreateUser)
  app.get('/users', GetUser)
  app.put('/users/:id', UpdateUser)
  app.delete('/users/:id', DeleteUser)

  // Cultivation
  app.post('/cultivations', CreateCultivation)
  app.get('/cultivations', GetCultivation)
  app.put('/cultivations/:id', UpdateCultivation)
  app.delete('/cultivations/:id', DeleteCultivation)

  // Mapped area
  app.post('/mapped-area', CreateMappedArea)
  app.get('/mapped-area', GetMappedArea)
}
