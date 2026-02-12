const log = (level: string, message: any, ...meta: any[]) => {
  const ts = new Date().toISOString()
  const payload = typeof message === 'string' ? { message } : message
  const fullPayload = { level, ts, ...payload, ...(meta?.[0] || {}) }
  
  if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(fullPayload))
  } else {
    // eslint-disable-next-line no-console
    console.log(`[${ts}] ${level.toUpperCase()}:`, message, meta.length ? meta : '')
  }
}

export const logger = {
  info: (message: any, meta?: any) => log('info', message, meta),
  warn: (message: any, meta?: any) => log('warn', message, meta),
  error: (message: any, meta?: any) => log('error', message, meta),
}
