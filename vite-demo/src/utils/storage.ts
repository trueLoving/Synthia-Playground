/**
 * 本地存储工具
 */

export class Storage {
  private prefix: string;

  constructor(prefix: string = 'synthia_') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  set<T>(key: string, value: T, expire?: number): void {
    const data = {
      value,
      expire: expire ? Date.now() + expire : null,
    };
    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(data));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key));
      if (!item) return null;

      const data = JSON.parse(item);
      if (data.expire && Date.now() > data.expire) {
        this.remove(key);
        return null;
      }

      return data.value as T;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  }

  getAll(): Record<string, any> {
    const result: Record<string, any> = {};
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          const originalKey = key.replace(this.prefix, '');
          result[originalKey] = this.get(originalKey);
        }
      });
    } catch (error) {
      console.error('Storage getAll error:', error);
    }
    return result;
  }
}

export const storage = new Storage();
