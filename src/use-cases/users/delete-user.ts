import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { User } from '@prisma/client'
import { NotFoundError } from '../errors/not-found-error'

interface DeleteUserUseCaseResquest {
  userId: string
}

interface DeleteUserUseCaseResponse {
  user: User
}

export class DeleteUserUseCase {
  constructor (private readonly userRepository: UsersRepository) {}

  async execute ({
    userId
  }: DeleteUserUseCaseResquest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundError()
    }

    const userResult = await this.userRepository.delete(userId)

    return { user: userResult }
  }
}
