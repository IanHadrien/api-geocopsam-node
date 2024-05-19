import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { NotFoundError } from '@/use-cases/errors/not-found-error'
import { UpdateUserUseCase } from '@/use-cases/users/update-user'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function UpdateUser (req: FastifyRequest, res: FastifyReply) {
  const updateUserBodySchema = z.object({
    userId: z.string(),
    name: z.string().min(3, 'O nome deve ter mais de 3 caracteres').optional(),
    email: z.string().min(3, 'O email deve ter mais de 3 caracteres').optional(),
    password: z.string().min(6, 'A senha deve ter mais de 6 caracteres').optional(),
    phone: z.string().min(6).optional(),
    role: z.string().min(1).optional()
  })

  const {
    userId,
    name,
    email,
    password,
    phone,
    role
  } = updateUserBodySchema.parse(req.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository)

    await updateUserUseCase.execute({
      userId, name, email, password, phone, role
    })
  } catch (err) {
    console.error('Error: ', err)
    if (err instanceof NotFoundError) {
      return res.status(409).send({ message: err.message })
    }

    return res.status(500).send({ message: err })
  }

  return res.status(200).send()
}
