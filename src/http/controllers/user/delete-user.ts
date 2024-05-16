import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteUserUseCase } from '@/use-cases/users/delete-user'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function DeleteUser (req: FastifyRequest, res: FastifyReply) {
  const userId = req.params.id // Aqui você acessa o ID passado na rot

  const prismaUsersRepository = new PrismaUsersRepository()

  try {
    const deleteUseCase = new DeleteUserUseCase(prismaUsersRepository)
    const user = deleteUseCase.execute({ userId })

    return user
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return res.status(409).send({ message: err.message })
    // }
    console.error(err)

    return res.status(500).send()
  }
}
