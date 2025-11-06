<template>
  <div class="stat-item">
    <div class="stat-icon">{{ icon }}</div>
    <span class="stat-number">{{ formattedValue }}</span>
    <span class="stat-label">{{ label }}</span>
    <div v-if="trend" class="stat-trend" :class="trendClass">
      <span>{{ trendText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  icon?: string;
  value: number | string;
  label: string;
  trend?: 'up' | 'down' | 'stable';
  format?: 'number' | 'percentage';
}

const props = withDefaults(defineProps<Props>(), {
  icon: '📊',
  format: 'number',
  trend: undefined,
});

const formattedValue = computed(() => {
  if (props.format === 'percentage') {
    return typeof props.value === 'number' ? `${props.value}%` : props.value;
  }
  return props.value;
});

const trendText = computed(() => {
  if (!props.trend) return '';
  switch (props.trend) {
    case 'up':
      return '↗️ 上升';
    case 'down':
      return '↘️ 下降';
    case 'stable':
      return '→ 稳定';
    default:
      return '';
  }
});

const trendClass = computed(() => {
  if (!props.trend) return '';
  return `stat-trend-${props.trend}`;
});
</script>

<style scoped>
.stat-item {
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: scale(1.05);
}

.stat-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.stat-number {
  display: block;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  display: block;
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 8px;
}

.stat-trend {
  font-size: 0.85rem;
  margin-top: 8px;
}

.stat-trend-up {
  color: #4ecdc4;
}

.stat-trend-down {
  color: #ff6b6b;
}

.stat-trend-stable {
  color: #feca57;
}
</style>
