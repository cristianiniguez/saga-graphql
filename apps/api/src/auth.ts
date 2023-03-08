import type { Request, RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'nunca pares de aprender'

const orm = new PrismaClient()

/**
 * Login with redirect support.
 *
 * The response will be redirected to the given `redirect` value if any.
 */
export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await orm.user.findUnique({ where: { username } })
    if (!user) throw new Error()

    const isValid = await compare(password, user.password)
    if (!isValid) throw new Error()

    const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '2h',
    })
    res.json({ token, username: user.username, id: user.id })
  } catch (error) {
    res.sendStatus(401)
  }
}

export const verifyToken = (req: Request): UserJwtPayload => {
  const { authorization = '' } = req.headers
  const token = authorization.replace('Bearer ', '')

  try {
    const verified = jwt.verify(token, JWT_SECRET_KEY)
    if (typeof verified === 'string') throw new Error()
    return {
      exp: verified.exp || 0,
      iat: verified.iat || 0,
      id: parseInt(verified.id || ''),
    }
  } catch (error) {
    throw new Error('Invalid token')
  }
}

const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const payload = verifyToken(req)
    req.user = { id: payload.id }
  } catch (error) {
    // ignore
  } finally {
    next()
  }
}

export default authMiddleware

export const currentUser: RequestHandler = async (req, res) => {
  try {
    const user = await orm.user.findUnique({
      where: { id: req.user?.id },
    })

    if (!user) throw new Error()

    res.json({
      id: user.id,
      username: user.username,
    })
  } catch (error) {
    res.sendStatus(401)
  }
}
