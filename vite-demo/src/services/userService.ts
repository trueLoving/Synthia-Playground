/**
 * 用户服务
 */
import { httpClient } from '../utils/http';
import type { User } from './authService';

export interface UserProfile extends User {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  bio?: string;
  avatar?: string;
}

export class UserService {
  async getUserProfile(userId: string): Promise<UserProfile> {
    return httpClient.get<UserProfile>(`/users/${userId}`);
  }

  async updateUserProfile(
    userId: string,
    data: UpdateUserData
  ): Promise<UserProfile> {
    return httpClient.put<UserProfile>(`/users/${userId}`, data);
  }

  async uploadAvatar(userId: string, file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    return httpClient.post<{ url: string }>(
      `/users/${userId}/avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    return httpClient.post(`/users/${userId}/password`, {
      oldPassword,
      newPassword,
    });
  }

  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
  }> {
    return httpClient.get('/users', params);
  }

  async deleteUser(userId: string): Promise<void> {
    return httpClient.delete(`/users/${userId}`);
  }

  async blockUser(userId: string): Promise<void> {
    return httpClient.post(`/users/${userId}/block`);
  }

  async unblockUser(userId: string): Promise<void> {
    return httpClient.post(`/users/${userId}/unblock`);
  }
}

export const userService = new UserService();
