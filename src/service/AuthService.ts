import { LoginCredentials, User } from 'src/types/Users';

class AuthService {
  constructor() {}

  async login(credentials: LoginCredentials): Promise<User | undefined> {
    try {
      const response = await fetch('http://localhost:6001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('login failed');
      }
      const data: { user: User } = await response.json();
      return data.user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async logout(): Promise<void> {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      throw new Error('Logout failed');
    }
  }
}
// Uses the singleton approach, so all instances of AuthService share the same state
export default new AuthService();
