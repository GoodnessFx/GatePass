import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { logger } from './utils/logger'
import { errorHandler } from './middleware/errorHandler'
import { authRoutes } from './routes/auth'
import { eventRoutes } from './routes/events'
import { orderRoutes } from './routes/orders'
import { ticketRoutes } from './routes/tickets'
import { analyticsRoutes } from './routes/analytics'
import { webhookRoutes } from './routes/webhooks'
import { notificationRoutes } from './routes/notifications'
import { healthRoutes } from './routes/health'

import passport from 'passport'
import session from 'express-session'
import './config/passport'

const app = express()
const PORT = process.env.PORT || 8000

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'), // Limit each IP
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

// Middleware
app.use(helmet())
app.use(compression())
app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      process.env.CORS_ORIGIN || 'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173'
    ]
    if (!origin || allowed.includes(origin)) {
      callback(null, true)
    } else {
      callback(null, true)
    }
  },
  credentials: true
}))
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }))
app.use(limiter)

// Body parsing - webhooks need raw body
app.use('/api/webhooks', express.raw({ type: 'application/json' }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Session and Passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}))
app.use(passport.initialize())
app.use(passport.session())


// Swagger documentation
/*
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GatePass API',
      version: '1.0.0',
      description: 'Decentralized event ticketing platform API',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://api.gatepass.com'
          : `http://localhost:${PORT}`,
        description: process.env.NODE_ENV === 'production' ? 'Production' : 'Development',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
*/

// Routes
app.use('/api/health', healthRoutes)
// Auth routes
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/orders', orderRoutes)
// app.use('/api/tickets', ticketRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/webhooks', webhookRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `The route ${req.method} ${req.originalUrl} does not exist.`
  })
})

// Error handling
app.use(errorHandler)

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully')
  process.exit(0)
})

app.listen(PORT, () => {
  logger.info(`🚀 GatePass API server running on http://localhost:${PORT}`)
  logger.info(`📚 API Documentation: http://localhost:${PORT}/docs`)
  logger.info(`🏥 Health Check: http://localhost:${PORT}/api/health`)
})

export default app
