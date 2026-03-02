import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../database/client'
import { createError } from './errorHandler'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
        role: string
        walletAddress?: string
        name?: string
      }
    }
  }
}

export type AuthenticatedRequest = Request & {
  user: {
    id: string
    email: string
    role: string
    walletAddress?: string
    name?: string
  }
}

export const authenticate = async (
  req: Request,
  _res: Response,
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

    req.user = {
      ...user,
      walletAddress: user.walletAddress || undefined,
      name: user.name || undefined
    }
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
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createError('Authentication required', 401))
    }

    if (!roles.includes(req.user.role)) {
      return next(createError('Insufficient permissions', 403))
    }

    next()
  }
}

export const requireOrganizer = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authReq = req as AuthenticatedRequest;
  if (!authReq.user || authReq.user.role !== 'ORGANIZER') {
    return next(createError('Organizer access required', 403))
  }
  next()
}
export const requireAdmin = requireRole(['ADMIN'])