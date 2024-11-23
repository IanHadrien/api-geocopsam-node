import { type FastifyInstance } from 'fastify'
import { CreateUser } from './create-user'
import { GetUser } from './get-user'
import { UpdateUser } from './update-user'
import { DeleteUser } from './delete-user'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { verifyJWT } from '@/http/middlewares/virify-jwt'
import { profile } from './profile'

export async function usersRoutes (app: FastifyInstance) {
  app.post('/login', authenticate)
  app.patch('/token/refresh', refresh)

  app.post('/users', CreateUser)
  app.get('/users', { onRequest: [verifyJWT] }, GetUser)
  app.put('/users/:id', UpdateUser)
  app.delete('/users/:id', DeleteUser)
  app.get('/me', profile)
}
