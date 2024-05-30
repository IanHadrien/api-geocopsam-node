import { Prisma } from '@prisma/client'

export interface MapRepository {
  createMany: (data: Prisma.MapLatLngCreateManyInput[]) => Promise<Prisma.BatchPayload>
  findById: (id: string) => Promise<Array<{ lat: string, lng: string }>>
  getAll: () => Promise<Array<Array<{ lat: number, lng: number }>>>
}
