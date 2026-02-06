import { Router } from 'express'
import { prisma } from '../../../database/client'
import { authenticate, AuthenticatedRequest } from '../middleware/auth'
import { asyncHandler } from '../middleware/errorHandler'

const router = Router()

// Get user notifications
router.get(
  '/',
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.user!.id
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50
    })
    
    const unreadCount = await prisma.notification.count({
      where: { userId, read: false }
    })

    res.json({ notifications, unreadCount })
  })
)

// Mark as read
router.post(
  '/:id/read',
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.user!.id
    const { id } = req.params

    await prisma.notification.updateMany({
      where: { id, userId },
      data: { read: true }
    })

    res.json({ ok: true })
  })
)

// Mark all as read
router.post(
  '/read-all',
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.user!.id
    
    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true }
    })

    res.json({ ok: true })
  })
)

export { router as notificationRoutes }
