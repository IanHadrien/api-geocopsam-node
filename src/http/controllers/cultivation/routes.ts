import { FastifyInstance } from 'fastify'
import { CreateCultivation } from './create-cultivation'
import { GetCultivation } from './get-cultivation'
import { UpdateCultivation } from './update-cultivation'
import { DeleteCultivation } from './delete-cultivation'
import { verifyJWT } from '@/http/middlewares/virify-jwt'

export async function cultivationRoutes (app: FastifyInstance) {
  // app.addHook('onRequest', verifyJWT)

  app.post('/cultivations', CreateCultivation)
  app.get('/cultivations', GetCultivation)
  app.put('/cultivations/:id', UpdateCultivation)
  app.delete('/cultivations/:id', DeleteCultivation)
}
