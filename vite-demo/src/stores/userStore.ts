import { ref, computed, type Ref } from 'vue';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: boolean;
}

class UserStore {
  private users: Ref<User[]> = ref([]);
  private currentUser: Ref<User | null> = ref(null);
  private preferences: Ref<UserPreferences> = ref({
    theme: 'auto',
    language: 'zh-CN',
    notifications: true,
  });

  // Getters
  get allUsers() {
    return this.users.value;
  }

  get activeUser() {
    return this.currentUser.value;
  }

  get userPreferences() {
    return this.preferences.value;
  }

  get isAdmin() {
    return computed(() => {
      return this.currentUser.value?.role === 'admin';
    });
  }

  get isAuthenticated() {
    return computed(() => {
      return this.currentUser.value !== null;
    });
  }

  // Actions
  async fetchUsers(): Promise<User[]> {
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Alice',
        email: 'alice@example.com',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Bob',
        email: 'bob@example.com',
        role: 'user',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Charlie',
        email: 'charlie@example.com',
        role: 'user',
        createdAt: new Date().toISOString(),
      },
    ];

    this.users.value = mockUsers;
    return mockUsers;
  }

  async fetchUserById(id: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const user = this.users.value.find(u => u.id === id);
    if (user) {
      this.currentUser.value = user;
      return user;
    }

    // 如果不在列表中，尝试从 API 获取
    const mockUser: User = {
      id,
      name: 'Unknown User',
      email: 'unknown@example.com',
      role: 'guest',
      createdAt: new Date().toISOString(),
    };

    this.currentUser.value = mockUser;
    return mockUser;
  }

  setCurrentUser(user: User | null) {
    this.currentUser.value = user;
  }

  updatePreferences(newPreferences: Partial<UserPreferences>) {
    this.preferences.value = {
      ...this.preferences.value,
      ...newPreferences,
    };
  }

  async login(email: string, password: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = this.users.value.find(u => u.email === email);
    if (user) {
      this.currentUser.value = user;
      return user;
    }

    return null;
  }

  logout() {
    this.currentUser.value = null;
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 600));

    const newUser: User = {
      ...userData,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    };

    this.users.value.push(newUser);
    return newUser;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const userIndex = this.users.value.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return null;
    }

    this.users.value[userIndex] = {
      ...this.users.value[userIndex],
      ...updates,
    };

    if (this.currentUser.value?.id === id) {
      this.currentUser.value = this.users.value[userIndex];
    }

    return this.users.value[userIndex];
  }

  async deleteUser(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const userIndex = this.users.value.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return false;
    }

    this.users.value.splice(userIndex, 1);

    if (this.currentUser.value?.id === id) {
      this.currentUser.value = null;
    }

    return true;
  }
}

export const userStore = new UserStore();
