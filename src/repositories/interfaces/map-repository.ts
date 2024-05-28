import { Prisma } from '@prisma/client'

export interface MapRepository {
  createMany: (data: Prisma.MapLatLngCreateManyInput[]) => Promise<Prisma.BatchPayload>
}
