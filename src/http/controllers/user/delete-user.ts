import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteUserUseCase } from '@/use-cases/users/delete-user'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function DeleteUser (req: FastifyRequest, res: FastifyReply) {
  const userId = req.params.id as string

  console.log('delete', userId)

  const prismaUsersRepository = new PrismaUsersRepository()

  try {
    const deleteUseCase = new DeleteUserUseCase(prismaUsersRepository)
    await deleteUseCase.execute({ userId })

    return res.status(200).send({ message: 'User deleted successfully' })
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return res.status(409).send({ message: err.message })
    // }
    console.error('Error: ', err)

    return res.status(500).send()
  }
}
