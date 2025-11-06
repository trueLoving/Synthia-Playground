/**
 * 本地存储工具
 */
export class Storage {
  constructor(prefix = 'synthia_') {
    this.prefix = prefix;
  }

  getKey(key) {
    return `${this.prefix}${key}`;
  }

  set(key, value, expire) {
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

  get(key) {
    try {
      const item = localStorage.getItem(this.getKey(key));
      if (!item) return null;

      const data = JSON.parse(item);
      if (data.expire && Date.now() > data.expire) {
        this.remove(key);
        return null;
      }

      return data.value;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  }

  clear() {
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

  getAll() {
    const result = {};
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
