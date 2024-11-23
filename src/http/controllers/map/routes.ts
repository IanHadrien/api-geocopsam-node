import { FastifyInstance } from 'fastify'
import { GetAllMap } from './getAll-map'
import { GetMap } from './get-map'

export async function mapRoutes (app: FastifyInstance) {
  app.get('/map', GetAllMap)
  app.get('/map/:id', GetMap)
}
