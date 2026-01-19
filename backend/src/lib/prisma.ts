import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const getPrisma = (accelerateUrl: string) => {
  return new PrismaClient({
    accelerateUrl,
  }).$extends(withAccelerate())
}
