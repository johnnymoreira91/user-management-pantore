import { ENV } from '@infra/config/params'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface tokenPayLod {
  id: number,
  email: string,
  name: string,
  roleId: number,
  iat: number,
  exp: number
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = verify(token, ENV.SECRET_KEY)
    const payload = data as tokenPayLod

    req.userId = payload.id
    req.roleId = payload.roleId
    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token error' })
  }
}