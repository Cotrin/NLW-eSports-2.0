import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export async function authorized(req: Request, res: Response, next: NextFunction) {
  const [, token] = req.headers.authorization.split(' ')

  if (!token) return res.status(403).json({ error: 'Access Denied' })

  try {
    const jwt:any = verify(token, 'SENHA-DO-TOKEN-SECRETA')

    console.log('JWT => ', jwt.user)
  
    return next()
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token' })
  }
}

export async function onlyAdminAuth(req: Request, res: Response, next: NextFunction) {
  const user = req.user

  if (user.role !== 'Admin') return res.status(403).json({ error: "You're not an admin user" })

  next()
}
