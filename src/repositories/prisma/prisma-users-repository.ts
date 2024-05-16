import { Prisma } from '@prisma/client'
import { UsersRepository } from '../interfaces/users-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async findById (id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }

  async getAll () {
    const user = await prisma.user.findMany()

    return user
  }

  async findByEmail (email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async create (data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }

  async update (id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: { id },
      data
    })

    return user
  }
}
