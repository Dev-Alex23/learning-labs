import { AuthServiceModel, LoginCredentials, RefreshResponse, User } from './Model';

class AuthService implements AuthServiceModel {
  constructor() {}

  async checkUserAuthentication(): Promise<User | undefined> {
    try {
      const response = await fetch('http://localhost:6001/api/auth/check', {
        method: 'GET',
        credentials: 'include',
      });
      console.log({ response });
      if (!response.ok) throw new Error('Not authenticated');
      const data: { user: User } = await response.json();
      return data.user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async login(credentials: LoginCredentials): Promise<User | undefined> {
    try {
      const response = await fetch('http://localhost:6001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        credentials: 'include',
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
      const response = await fetch('http://localhost:6001/api/auth/logout', { method: 'POST', credentials: 'include' });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async refreshToken(): Promise<RefreshResponse | undefined> {
    try {
      const response = await fetch('http://localhost:6001/api/auth/refresh_token', {
        headers: { 'Content-Type': 'Application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      console.log({ data });
      return data;
    } catch (error) {
      throw new Error('Logout failed');
    }
  }
}
// Uses the singleton approach, so all instances of AuthService share the same state
export default new AuthService();
