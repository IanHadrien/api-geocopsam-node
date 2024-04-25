import { makeCreateUserUseCase } from '@/factories/make-create-user-use-case'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateUser (req: FastifyRequest, res: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
    phone: z.string().min(6).optional(),
    role: z.string()
  })

  const {
    name,
    email,
    password,
    phone,
    role
  } = createUserBodySchema.parse(req.body)

  try {
    const createUserUseCase = makeCreateUserUseCase()

    await createUserUseCase.execute({
      name, email, password, phone, role
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: err.message })
    }

    return res.status(500).send()
  }

  return res.status(200).send()
}
