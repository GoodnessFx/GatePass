import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import { prisma } from '../../../database/client'
import { asyncHandler, createError } from '../middleware/errorHandler'
import { authenticate, AuthenticatedRequest } from '../middleware/auth'
import { logger } from '../utils/logger'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import passport from 'passport'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/auth'

const router = Router()
export { router as authRoutes }

// Helper to set refresh token in cookie
const setRefreshTokenCookie = (res: any, token: string) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  })
}

// Google Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  asyncHandler(async (req, res) => {
    const user = req.user as any
    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role })
    const refreshToken = generateRefreshToken({ userId: user.id })

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    })

    setRefreshTokenCookie(res, refreshToken)
    
    const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:5173'
    res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`)
  })
)

// Twitter Auth Routes
router.get('/twitter', passport.authenticate('twitter'))

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login', session: false }),
  asyncHandler(async (req, res) => {
    const user = req.user as any
    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role })
    const refreshToken = generateRefreshToken({ userId: user.id })

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    })

    setRefreshTokenCookie(res, refreshToken)
    
    const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:5173'
    res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`)
  })
)

router.post('/register', [
  body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).withMessage('Password must contain uppercase, lowercase and a number'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('walletAddress').optional().isEthereumAddress().withMessage('Invalid Ethereum address')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw createError(errors.array()[0].msg, 400)
  }

  const { email, password, name, walletAddress, role } = req.body

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, ...(walletAddress ? [{ walletAddress }] : [])] }
  })

  if (existingUser) {
    throw createError('User with this email or wallet address already exists', 409)
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      walletAddress,
      role: role === 'ORGANIZER' ? 'ORGANIZER' : 'USER'
    }
  })

  const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role })
  const refreshToken = generateRefreshToken({ userId: user.id })

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken }
  })

  setRefreshTokenCookie(res, refreshToken)

  res.status(201).json({
    message: 'User registered successfully',
    token: accessToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      walletAddress: user.walletAddress
    }
  })
}))

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw createError(errors.array()[0].msg, 400)
  }

  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    throw createError('Invalid email or password', 401)
  }

  const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role })
  const refreshToken = generateRefreshToken({ userId: user.id })

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken }
  })

  setRefreshTokenCookie(res, refreshToken)

  res.json({
    message: 'Login successful',
    token: accessToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      walletAddress: user.walletAddress
    }
  })
}))

router.post('/refresh-token', asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken
  if (!refreshToken) throw createError('Refresh token required', 401)

  try {
    const decoded = verifyRefreshToken(refreshToken) as any
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } })

    if (!user || user.refreshToken !== refreshToken) {
      throw createError('Invalid refresh token', 401)
    }

    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role })
    res.json({ token: accessToken })
  } catch (err) {
    throw createError('Invalid refresh token', 401)
  }
}))

router.post('/logout', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  if (req.user) {
    await prisma.user.update({
      where: { id: req.user.id },
      data: { refreshToken: null }
    })
  }
  res.clearCookie('refreshToken')
  res.json({ message: 'Logged out successfully' })
}))

router.get('/me', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  res.json({ user: req.user })
}))

export default router
