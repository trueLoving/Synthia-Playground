import { ref, watch, type Ref } from 'vue';

export type StorageType = 'localStorage' | 'sessionStorage';

export interface UseStorageOptions<T> {
  storage?: StorageType;
  serializer?: {
    read: (value: string) => T;
    write: (value: T) => string;
  };
}

export function useStorage<T>(
  key: string,
  defaultValue: T,
  options: UseStorageOptions<T> = {}
): [Ref<T>, (value: T) => void, () => void] {
  const { storage = 'localStorage', serializer = JSON } = options;

  const storageObj = storage === 'localStorage' ? localStorage : sessionStorage;

  const read = (): T => {
    try {
      const item = storageObj.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      return serializer.read(item);
    } catch (error) {
      console.error(`Error reading ${key} from ${storage}:`, error);
      return defaultValue;
    }
  };

  const write = (value: T): void => {
    try {
      const serialized = serializer.write(value);
      storageObj.setItem(key, serialized);
    } catch (error) {
      console.error(`Error writing ${key} to ${storage}:`, error);
    }
  };

  const remove = (): void => {
    try {
      storageObj.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from ${storage}:`, error);
    }
  };

  const state = ref<T>(read()) as Ref<T>;

  watch(
    state,
    newValue => {
      write(newValue);
    },
    { deep: true }
  );

  const setValue = (value: T) => {
    state.value = value;
  };

  const removeValue = () => {
    remove();
    state.value = defaultValue;
  };

  return [state, setValue, removeValue];
}
