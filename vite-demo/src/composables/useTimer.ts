import { ref, onMounted, onUnmounted } from 'vue';

export interface TimerOptions {
  interval?: number;
  immediate?: boolean;
  onTick?: (elapsed: number) => void;
}

export function useTimer(options: TimerOptions = {}) {
  const { interval = 1000, immediate = false, onTick } = options;

  const elapsed = ref(0);
  const isRunning = ref(false);
  const timerId = ref<number | null>(null);

  const start = () => {
    if (isRunning.value) return;

    isRunning.value = true;
    if (immediate && onTick) {
      onTick(elapsed.value);
    }

    timerId.value = window.setInterval(() => {
      elapsed.value += interval / 1000;
      if (onTick) {
        onTick(elapsed.value);
      }
    }, interval);
  };

  const stop = () => {
    if (!isRunning.value) return;

    isRunning.value = false;
    if (timerId.value !== null) {
      clearInterval(timerId.value);
      timerId.value = null;
    }
  };

  const reset = () => {
    stop();
    elapsed.value = 0;
  };

  const pause = () => {
    stop();
  };

  const resume = () => {
    if (!isRunning.value) {
      start();
    }
  };

  onUnmounted(() => {
    stop();
  });

  return {
    elapsed,
    isRunning,
    start,
    stop,
    reset,
    pause,
    resume,
  };
}
