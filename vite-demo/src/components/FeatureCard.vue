<template>
  <div class="feature-card" :class="{ 'feature-card-highlight': highlight }">
    <div class="feature-icon">{{ icon }}</div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div v-if="features && features.length > 0" class="feature-list">
      <span v-for="feature in features" :key="feature" class="feature-tag">
        {{ feature }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string;
  title: string;
  description: string;
  features?: string[];
  highlight?: boolean;
}

withDefaults(defineProps<Props>(), {
  features: () => [],
  highlight: false,
});
</script>

<style scoped>
.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.feature-card-highlight {
  border: 2px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin: 0 0 15px 0;
}

.feature-card p {
  margin: 0 0 20px 0;
  opacity: 0.9;
  line-height: 1.6;
}

.feature-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.feature-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
}
</style>
