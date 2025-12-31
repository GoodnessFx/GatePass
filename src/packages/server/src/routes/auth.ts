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
const router = Router()

// Google Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    const user = req.user as any
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )
    
    // Redirect to frontend with token
    const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:5173'
    res.redirect(`${frontendUrl}/auth/callback?token=${token}`)
  }
)

// Twitter Auth Routes
router.get('/twitter', passport.authenticate('twitter'))

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    const user = req.user as any
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )
    
    // Redirect to frontend with token
    const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:5173'
    res.redirect(`${frontendUrl}/auth/callback?token=${token}`)
  }
)

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         walletAddress:
 *           type: string
 *         role:
 *           type: string
 *           enum: [USER, ORGANIZER, ADMIN]
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               name:
 *                 type: string
 *               walletAddress:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 */
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty(),
  body('walletAddress').optional().isEthereumAddress()
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw createError('Validation failed: ' + errors.array().map(e => e.msg).join(', '), 400)
  }

  const { email, password, name, walletAddress } = req.body

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        ...(walletAddress ? [{ walletAddress }] : [])
      ]
    }
  })

  if (existingUser) {
    throw createError('User with this email or wallet address already exists', 409)
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12)

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      walletAddress,
      role: 'USER' // Default role
    },
    select: {
      id: true,
      email: true,
      name: true,
      walletAddress: true,
      role: true,
      createdAt: true
    }
  })

  // Generate JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  logger.info(`New user registered: ${user.email}`)

  res.status(201).json({
    message: 'User registered successfully',
    token,
    user
  })
}))

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 */
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw createError('Invalid email or password', 400)
  }

  const { email, password } = req.body

  // Find user with password
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      walletAddress: true,
      role: true,
      password: true // Select password to verify
    }
  })

  if (!user || !user.password) {
    throw createError('Invalid email or password', 401)
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    throw createError('Invalid email or password', 401)
  }

  // Generate JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  logger.info(`User logged in: ${user.email}`)

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user

  res.json({
    message: 'Login successful',
    token,
    user: userWithoutPassword
  })
}))

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Reset email sent
 */
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail()
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw createError('Invalid email', 400)
  }

  const { email } = req.body
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    // Return success even if user not found to prevent enumeration
    return res.json({ message: 'If an account with that email exists, a password reset link has been sent.' })
  }

  // Generate token
  const resetToken = crypto.randomBytes(32).toString('hex')
  const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpiry
    }
  })

  // In a real production app, configure nodemailer transport
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS
  //   }
  // })

  // For development/demo, we'll just log the token
  logger.info(`Password reset token for ${email}: ${resetToken}`)
  
  // NOTE: In a real app, you would send the email here:
  // await transporter.sendMail({
  //   to: email,
  //   subject: 'Password Reset',
  //   html: `<p>Click <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">here</a> to reset your password.</p>`
  // })

  res.json({ message: 'If an account with that email exists, a password reset link has been sent.' })
}))

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password with token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post('/reset-password', [
  body('token').notEmpty(),
  body('password').isLength({ min: 6 })
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw createError('Invalid input', 400)
  }

  const { token, password } = req.body

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() }
    }
  })

  if (!user) {
    throw createError('Invalid or expired password reset token', 400)
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null
    }
  })

  res.json({ message: 'Password has been reset successfully' })
}))

/**
 * @swagger
 * /api/auth/wallet-connect:
 *   post:
 *     summary: Connect wallet to existing account or create new account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - walletAddress
 *               - signature
 *               - message
 *             properties:
 *               walletAddress:
 *                 type: string
 *               signature:
 *                 type: string
 *               message:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Wallet connected successfully
 */
router.post('/wallet-connect', [
  body('walletAddress').isEthereumAddress(),
  body('signature').notEmpty(),
  body('message').notEmpty(),
  body('email').optional().isEmail().normalizeEmail(),
  body('name').optional().trim()
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw createError('Validation failed: ' + errors.array().map(e => e.msg).join(', '), 400)
  }

  const { walletAddress, signature, message, email, name } = req.body

  // TODO: Verify signature against message and wallet address
  // This would involve checking that the signature was created by the wallet
  // For demo purposes, we'll skip this verification

  // Check if wallet is already connected
  let user = await prisma.user.findUnique({
    where: { walletAddress },
    select: {
      id: true,
      email: true,
      name: true,
      walletAddress: true,
      role: true
    }
  })

  if (!user) {
    // Create new user if wallet not found
    if (!email || !name) {
      throw createError('Email and name required for new wallet connection', 400)
    }

    user = await prisma.user.create({
      data: {
        email,
        name,
        walletAddress,
        role: 'USER'
      },
      select: {
        id: true,
        email: true,
        name: true,
        walletAddress: true,
        role: true
      }
    })

    logger.info(`New user created via wallet connect: ${walletAddress}`)
  }

  // Generate JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  res.json({
    message: 'Wallet connected successfully',
    token,
    user
  })
}))

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/me', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: {
      id: true,
      email: true,
      name: true,
      walletAddress: true,
      role: true,
      avatar: true,
      createdAt: true,
      _count: {
        select: {
          organizedEvents: true,
          orders: true
        }
      }
    }
  })

  if (!user) {
    throw createError('User not found', 404)
  }

  res.json({ user })
}))

/**
 * @swagger
 * /api/auth/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.put('/profile', authenticate, [
  body('name').optional().trim().notEmpty(),
  body('email').optional().isEmail().normalizeEmail(),
  body('avatar').optional().isURL()
], asyncHandler(async (req: AuthenticatedRequest, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw createError('Validation failed: ' + errors.array().map(e => e.msg).join(', '), 400)
  }

  const { name, email, avatar } = req.body

  const updatedUser = await prisma.user.update({
    where: { id: req.user!.id },
    data: {
      ...(name && { name }),
      ...(email && { email }),
      ...(avatar && { avatar })
    },
    select: {
      id: true,
      email: true,
      name: true,
      walletAddress: true,
      role: true,
      avatar: true
    }
  })

  logger.info(`User profile updated: ${updatedUser.email}`)

  res.json({
    message: 'Profile updated successfully',
    user: updatedUser
  })
}))

export { router as authRoutes }
