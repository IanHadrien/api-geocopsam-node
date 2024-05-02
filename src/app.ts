import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import cors from '@fastify/cors'

export const app = fastify()

app.register(cors, {
  origin: true,
  // origin: ['http://localhost:5173'], // Substitua pelo seu endereço de front-end
  credentials: true // Permitir credenciais
})

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: tratar error com logs futuros
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
