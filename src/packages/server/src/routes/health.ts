import { Router } from 'express'
import { prisma } from '../../../database/client'
import { logger } from '../utils/logger'

const router = Router()

router.get('/', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`

    const healthData = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        database: 'connected'
      },
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    }

    res.json(healthData)
  } catch (error) {
    logger.error('Health check failed:', error)

    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      services: {
        database: 'disconnected'
      },
      error: 'Service unhealthy'
    })
  }
})

router.get('/ready', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`

    res.json({
      status: 'ready',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    logger.error('Readiness check failed:', error)
    res.status(503).json({
      status: 'not ready',
      timestamp: new Date().toISOString()
    })
  }
})

router.get('/payments', async (req, res) => {
  const paystackConfigured = !!process.env.PAYSTACK_SECRET_KEY
  const flutterwaveConfigured = !!process.env.FLUTTERWAVE_SECRET_HASH
  const mpesaConfigured =
    !!process.env.MPESA_CONSUMER_KEY &&
    !!process.env.MPESA_CONSUMER_SECRET &&
    !!process.env.MPESA_SHORTCODE &&
    !!process.env.MPESA_PASSKEY

  const gateways = {
    paystack: {
      configured: paystackConfigured,
      status: paystackConfigured ? 'ok' : 'not_configured'
    },
    flutterwave: {
      configured: flutterwaveConfigured,
      status: flutterwaveConfigured ? 'ok' : 'not_configured'
    },
    mpesa: {
      configured: mpesaConfigured,
      status: mpesaConfigured ? 'ok' : 'not_configured'
    },
    stripe: {
      configured: false,
      status: 'not_configured'
    }
  }

  const anyConfigured =
    paystackConfigured || flutterwaveConfigured || mpesaConfigured

  res.json({
    status: anyConfigured ? 'ok' : 'not_configured',
    timestamp: new Date().toISOString(),
    gateways
  })
})

export { router as healthRoutes }
