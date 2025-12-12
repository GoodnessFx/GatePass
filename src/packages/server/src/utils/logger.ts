const log = (level: string, message: any, ...meta: any[]) => {
  const ts = new Date().toISOString()
  const payload = typeof message === 'string' ? { message } : message
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ level, ts, ...payload, ...(meta?.[0] || {}) }))
}

export const logger = {
  info: (message: any, meta?: any) => log('info', message, meta),
  warn: (message: any, meta?: any) => log('warn', message, meta),
  error: (message: any, meta?: any) => log('error', message, meta),
}
