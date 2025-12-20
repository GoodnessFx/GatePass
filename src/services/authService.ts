import { emailConfig } from '../config/email';

interface RegisterUserParams {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  role: string;
  passwordHash: string;
}

export const registerUser = async (user: RegisterUserParams): Promise<void> => {
  return new Promise((resolve) => {
    // Simulate network delay based on config
    const delay = emailConfig.simulation.enabled ? emailConfig.simulation.delay : 500;
    
    setTimeout(() => {
      // In a real app, we would make an API call here.
      // For now, we update local storage as the "database".
      
      const storedUsers = localStorage.getItem('gp_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const newUser = {
        ...user,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('gp_users', JSON.stringify(users));
      
      // Also set the legacy/simple auth items for compatibility
      localStorage.setItem('gp_account_created', 'true');
      localStorage.setItem('gp_user_email', user.email);
      localStorage.setItem('gp_user_first_name', user.firstName);
      localStorage.setItem('gp_user_last_name', user.lastName);
      localStorage.setItem('gp_user_country', user.country);
      localStorage.setItem('gp_user_role', user.role);
      
      console.log(`[Email Service] Sending welcome email to ${user.email} (Simulated)`);
      
      resolve();
    }, delay);
  });
};
