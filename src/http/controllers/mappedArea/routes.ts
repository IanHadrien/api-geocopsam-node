import { FastifyInstance } from 'fastify'
import { CreateMappedArea } from './create-mapped-area'
import { GetMappedArea } from './get-mapped-area'
import { UpdateMappedArea } from './update-mapped-area'
import { DeleteMappedArea } from './delete-mapped-area'

export async function mappedAreaRoutes (app: FastifyInstance) {
  app.post('/mapped-area', CreateMappedArea)
  app.get('/mapped-area', GetMappedArea)
  app.put('/mapped-area/:id', UpdateMappedArea)
  app.delete('/mapped-area/:id', DeleteMappedArea)
}
