import fastify from 'fastify'
import { usersRoutes } from './http/controllers/user/routes'
import { ZodError } from 'zod'
import { env } from './env'
import cors from '@fastify/cors'
import { cultivationRoutes } from './http/controllers/cultivation/routes'
import { mapRoutes } from './http/controllers/map/routes'
import { mappedAreaRoutes } from './http/controllers/mappedArea/routes'
import { plantationRoutes } from './http/controllers/plantation/routes'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '10m'
  }
})

app.register(cors, {
  origin: true,
  // origin: ['http://localhost:5173'], // Substitua pelo seu endereço de front-end
  credentials: true // Permitir credenciais
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(plantationRoutes)
app.register(mappedAreaRoutes)
app.register(mapRoutes)
app.register(cultivationRoutes)

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
