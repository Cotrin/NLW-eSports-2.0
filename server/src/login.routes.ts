import { Router } from 'express'
import { sign } from 'jsonwebtoken'

import { authorized, onlyAdminAuth } from './middleware/auth.middleware'

export const loginRoutes = Router()

loginRoutes.post('/login', (req, res) => {
  const { username, password } = req.body

  if (!username || !password) return res.status(400).send('Missing username or password')

  // Achar usuário no banco de dados
  // FAKE
  if (username === 'plebe' && password === 'plebe') {
    // Gera um Token pelo JWT
    const token = sign(
      {
        user: {
          name: 'Citron',
          role: 'plebe'
        }
      },
      'SENHA-DO-TOKEN-SECRETA'
    )

    return res.json({ token })
  }

  if (username === 'admin' && password === 'admin') {
    // Gera um Token pelo JWT
    const token = sign(
      {
        user: {
          name: 'Dibz',
          role: 'Admin'
        }
      },
      'SENHA-DO-TOKEN-SECRETA',
      {
        expiresIn: '1d'
      }
    )


    return res.json({ token })
  }

  return res.status(400).json({ error: 'Invalid email or password' })
})

// Rota de users plebe
loginRoutes.get('/plebeAuth', authorized, (req, res, next) => {
  res.json({ secret: 'You are Plebe' })
})

// Rota de users Admin
loginRoutes.get('/onlyAdmins', authorized, onlyAdminAuth, (req, res, next) => {
  res.json({ secret: 'You are Admin' })
})
