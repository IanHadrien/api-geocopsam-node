import { Prisma } from '@prisma/client'

export interface MapRepository {
  createMany: (data: Prisma.MapLatLngCreateManyInput[]) => Promise<Prisma.BatchPayload>
  findById: (id: string) => Promise<Array<Array<{ lat: number, lng: number }>>>
  getAll: () => Promise<Array<Array<{ lat: number, lng: number }>>>
}
