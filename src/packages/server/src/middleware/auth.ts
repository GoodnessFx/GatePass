import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '@passmint/database'
import { createError } from './errorHandler'

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
    walletAddress?: string
  }
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError('Access token required', 401)
    }

    const token = authHeader.substring(7)
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        walletAddress: true,
        name: true
      }
    })

    if (!user) {
      throw createError('Invalid token', 401)
    }

    req.user = user
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(createError('Invalid token', 401))
    } else {
      next(error)
    }
  }
}

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createError('Authentication required', 401))
    }

    if (!roles.includes(req.user.role)) {
      return next(createError('Insufficient permissions', 403))
    }

    next()
  }
}

export const requireOrganizer = requireRole(['ORGANIZER', 'ADMIN'])
export const requireAdmin = requireRole(['ADMIN'])