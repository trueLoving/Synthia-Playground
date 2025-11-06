/**
 * 认证服务
 */
import { httpClient } from '../utils/http';
import { storage } from '../utils/storage';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  roles: string[];
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  async login(credentials: LoginCredentials): Promise<AuthToken> {
    const response = await httpClient.post<AuthToken>(
      '/auth/login',
      credentials
    );
    this.setToken(response);
    return response;
  }

  async logout(): Promise<void> {
    try {
      await httpClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuth();
    }
  }

  async register(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> {
    return httpClient.post<User>('/auth/register', userData);
  }

  async refreshToken(): Promise<AuthToken> {
    const token = this.getRefreshToken();
    if (!token) {
      throw new Error('No refresh token available');
    }
    const response = await httpClient.post<AuthToken>('/auth/refresh', {
      refreshToken: token,
    });
    this.setToken(response);
    return response;
  }

  async getCurrentUser(): Promise<User | null> {
    const cached = storage.get<User>(this.USER_KEY);
    if (cached) return cached;

    try {
      const user = await httpClient.get<User>('/auth/me');
      storage.set(this.USER_KEY, user);
      return user;
    } catch (error) {
      return null;
    }
  }

  setToken(token: AuthToken): void {
    storage.set(this.TOKEN_KEY, token);
    // HTTP client will handle token in interceptor
  }

  getToken(): AuthToken | null {
    return storage.get<AuthToken>(this.TOKEN_KEY);
  }

  getAccessToken(): string | null {
    const token = this.getToken();
    return token?.accessToken || null;
  }

  getRefreshToken(): string | null {
    const token = this.getToken();
    return token?.refreshToken || null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return true;
  }

  clearAuth(): void {
    storage.remove(this.TOKEN_KEY);
    storage.remove(this.USER_KEY);
    // HTTP client will handle token removal in interceptor
  }
}

export const authService = new AuthService();
