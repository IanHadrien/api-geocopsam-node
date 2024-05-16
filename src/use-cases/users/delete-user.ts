import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { User } from '@prisma/client'

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
    console.log('Id teste', userId)
    const user = await this.userRepository.delete(userId)

    return { user }
  }
}
