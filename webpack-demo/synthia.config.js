import { defineConfig } from 'synthia-cli';
import { docPlugin } from 'synthia-doc';
import { cachePlugin } from 'synthia-cache';

const docPluginOptions = {
  enabled: true,
  type: 'local',
  directory: '.synthia-doc',
  ttl: 3600000,
  maxSize: '100MB',
  compression: true,
  strategy: 'lru',
};

const cachePluginOptions = {
  enabled: true,
  local: {
    dir: '.synthia-cache',
    maxSize: 100 * 1024 * 1024,
    ttl: 7 * 24 * 60 * 60 * 1000,
    compression: true,
  },
  strategy: {
    level: 'local',
    localFirst: true,
    autoSync: false,
    syncInterval: 5 * 60 * 1000,
  },
};

export default defineConfig({
  name: 'synthia-webpack-demo',
  version: '1.0.0',
  description: 'Synthia Engine Webpack Demo with Cache System',

  // 插件配置 - Vite 风格调用
  plugins: [docPlugin(docPluginOptions), cachePlugin(cachePluginOptions)],
});
