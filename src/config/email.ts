
export const emailConfig = {
  sender: {
    name: 'GatePass',
    email: 'noreply@gatepass.com',
  },
  smtp: {
    host: import.meta.env.VITE_SMTP_HOST || 'smtp.mailtrap.io',
    port: parseInt(import.meta.env.VITE_SMTP_PORT || '2525'),
    auth: {
      user: import.meta.env.VITE_SMTP_USER || 'user',
      pass: import.meta.env.VITE_SMTP_PASS || 'pass',
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
