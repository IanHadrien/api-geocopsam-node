import { Prisma } from '@prisma/client'

export interface MapRepository {
  createMany: (data: Prisma.MapLatLngCreateManyInput[]) => Promise<Prisma.BatchPayload>
  getAll: (id: string) => Promise<Array<{ lat: string, lng: string }>>
}
