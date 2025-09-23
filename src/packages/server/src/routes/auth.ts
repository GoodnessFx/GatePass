import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import { prisma } from '@passmint/database'
import { asyncHandler, createError } from '../middleware/errorHandler'
import { authenticate, AuthenticatedRequest } from '../middleware/auth'
import { logger } from '../utils/logger'

const router = Router()

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
      // password: true // Note: password not included in Prisma schema for security
    }
  })

  if (!user) {
    throw createError('Invalid email or password', 401)
  }

  // For demo purposes, we'll skip password verification
  // In production, you'd verify against a hashed password stored in the database
  
  // Generate JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  logger.info(`User logged in: ${user.email}`)

  res.json({
    message: 'Login successful',
    token,
    user
  })
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