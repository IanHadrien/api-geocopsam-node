import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../interfaces/users-repository'
import { prisma } from '@/lib/prisma'
import { PaginationType } from '@/@types/paginate'

export class PrismaUsersRepository implements UsersRepository {
  async findById (id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }

  async getAll (page: number, pageSize: number): Promise<PaginationType<User>> {
    const skip = (page - 1) * pageSize
    const take = pageSize

    const [data, totalCount] = await Promise.all([
      await prisma.user.findMany({
        skip,
        take
      }),
      prisma.user.count()
    ])

    return { data, totalCount }
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

  async delete (id: string) {
    const user = await prisma.user.delete({
      where: { id }
    })

    return user
  }
}
