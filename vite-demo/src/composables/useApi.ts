import { ref, type Ref } from 'vue';

export interface ApiOptions<T> {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export interface UseApiReturn<T> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T = any>(
  apiFn: (...args: any[]) => Promise<T>,
  options: ApiOptions<T> = {}
): UseApiReturn<T> {
  const { immediate = false, onSuccess, onError } = options;

  const data = ref<T | null>(null) as Ref<T | null>;
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const execute = async (...args: any[]): Promise<T | null> => {
    loading.value = true;
    error.value = null;

    try {
      const result = await apiFn(...args);
      data.value = result;
      if (onSuccess) {
        onSuccess(result);
      }
      return result;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      error.value = errorObj;
      if (onError) {
        onError(errorObj);
      }
      return null;
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    data.value = null;
    loading.value = false;
    error.value = null;
  };

  if (immediate) {
    execute();
  }

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}
