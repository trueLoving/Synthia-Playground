<template>
  <div class="user-profile">
    <div class="avatar">
      <img v-if="user.avatar" :src="user.avatar" :alt="user.name" />
      <span v-else class="avatar-placeholder">{{ userInitials }}</span>
    </div>
    <div class="user-info">
      <h3>{{ user.name }}</h3>
      <p class="user-email">{{ user.email }}</p>
      <div class="user-stats">
        <div class="stat">
          <span class="stat-value">{{ user.stats?.projects || 0 }}</span>
          <span class="stat-label">项目</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ user.stats?.contributions || 0 }}</span>
          <span class="stat-label">贡献</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface UserStats {
  projects: number;
  contributions: number;
}

interface User {
  name: string;
  email: string;
  avatar?: string;
  stats?: UserStats;
}

interface Props {
  user: User;
}

const props = defineProps<Props>();

const userInitials = computed(() => {
  return props.user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
});
</script>

<style scoped>
.user-profile {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 2rem;
  font-weight: bold;
}

.user-info {
  flex: 1;
}

.user-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.5rem;
}

.user-email {
  margin: 0 0 15px 0;
  opacity: 0.8;
  font-size: 0.9rem;
}

.user-stats {
  display: flex;
  gap: 20px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4ecdc4;
}

.stat-label {
  font-size: 0.85rem;
  opacity: 0.8;
}
</style>
