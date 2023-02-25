declare module 'easygraphql-tester'

namespace Express {
  interface User {
    id: number
  }

  interface Request {
    user?: Express.User
  }
}

interface UserJwtPayload {
  id: number // The user id
  iat: number // Issued at
  exp: number // Expire time
}

type ResolverContext = {
  orm: import('@prisma/client').PrismaClient
  user?: Express.User
}
