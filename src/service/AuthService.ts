import { LoginCredentials, RefreshResponse, User } from './AuthService.model';

/**
 * A wrapper function to make a request.
 *
 * @param path The path to fetch.
 * @param options Optional customization options for the request. Allows omitting or overriding defaults.
 * @returns A promise resolving to the response data.
 */
export const fetchWrapper = async <T>(path: string, options: RequestInit): Promise<T | undefined> => {
  try {
    const response = await fetch(`http://localhost:6001/api/auth/${path}`, {
      ...options,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

/**
 * Logs in a user with the provided credentials.
 * @param credentials The login credentials.
 * @returns A promise that resolves with the User or undefined if login fails.
 */
export const authLogin = async (credentials: LoginCredentials): Promise<User | undefined> => {
  try {
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    };
    const userResponse = await fetchWrapper<User>('login', options);
    return userResponse;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

/**
 * Logs out the current user.
 * @returns void
 */
export const authLogout = async (): Promise<void> => {
  try {
    await fetchWrapper<Response>('logout', { method: 'POST', credentials: 'include' });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

/**
 * Refreshes the `accessToken`
 * @returns A promise that resolves and returns a new `accessToken` if the `refreshToken` is still valid
 */
export const authRefreshToken = async (): Promise<RefreshResponse | undefined> => {
  try {
    const options: RequestInit = {
      headers: { 'Content-Type': 'Application/json' },
      credentials: 'include',
    };
    const response = await fetchWrapper<RefreshResponse>('refresh_token', options);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
