
export const emailConfig = {
  sender: {
    name: 'GatePass',
    email: 'noreply@gatepass.com',
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.SMTP_PORT || '2525'),
    auth: {
      user: process.env.SMTP_USER || 'user',
      pass: process.env.SMTP_PASS || 'pass',
    },
  },
  templates: {
    welcome: {
      subject: 'Welcome to GatePass!',
    },
  },
  simulation: {
    enabled: true,
    delay: 2000, // ms
  }
};
