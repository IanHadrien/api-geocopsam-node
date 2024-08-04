import { FastifyInstance } from 'fastify'
import { CreatePlantation } from './create-plantation'
import { GetPlantation } from './get-plantation'
import { UpdatePlantation } from './update-plantation'
import { DeletePlantation } from './delete-plantation'

export async function plantationRoutes (app: FastifyInstance) {
  app.post('/plantations', CreatePlantation)
  app.get('/plantations', GetPlantation)
  app.put('/plantations/:id', UpdatePlantation)
  app.delete('/plantations/:id', DeletePlantation)
}
