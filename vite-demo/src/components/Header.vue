<template>
  <header class="header">
    <div class="header-content">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </div>
    <nav class="nav">
      <a
        v-for="link in links"
        :key="link.path"
        :href="link.path"
        class="nav-link"
      >
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface NavLink {
  path: string;
  label: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  links?: NavLink[];
}

const props = withDefaults(defineProps<Props>(), {
  title: '🚀 Synthia Engine',
  subtitle: '体验统一前端工程化工具集',
  links: () => [
    { path: '#features', label: '特性' },
    { path: '#stats', label: '数据' },
    { path: '#about', label: '关于' },
  ],
});

const headerClasses = computed(() => ({
  header: true,
  'header-large': props.title.length > 20,
}));
</script>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.header-content {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.header p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
