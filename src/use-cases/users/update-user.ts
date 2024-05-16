import { type UsersRepository } from '@/repositories/interfaces/users-repository'
import { type User } from '@prisma/client'
import { NotFoundError } from '../errors/not-found-error'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

interface UpdateUserUseCaseRequest {
  userId: string
  name?: string
  email?: string
  password?: string
  role?: string
  phone?: string
}

interface UpdateUserUseCaseResponse {
  user: User
}

export class UpdateUserUseCase {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute (
    {
      userId,
      name,
      email,
      phone,
      role
    }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundError()
    }

    if (email) {
      const userWithSameEmail = await this.usersRepository.findByEmail(email)

      if (userWithSameEmail) {
        throw new UserAlreadyExistsError()
      }
    }

    const updateData: Partial<User> = user

    if (name) updateData.name = name
    if (email) updateData.email = email
    if (phone) updateData.phone = phone
    if (role) updateData.role = role

    const updateUser = await this.usersRepository.update(userId, updateData)

    return {
      user: updateUser
    }
  }
}
