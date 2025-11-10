import { defineConfig } from 'synthia-cli';
import { docPlugin } from 'synthia-doc';
import { cachePlugin } from 'synthia-cache';
import { doctorPlugin } from 'synthia-doctor';
import { testPlugin } from 'synthia-test';
import { lintPlugin } from 'synthia-lint';

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
};

const doctorPluginOptions = {
  enabled: true,
  rules: [],
  fix: false,
  output: 'console',
  format: 'table',
};

const testPluginOption = {
  enabled: true,
  framework: 'vitest',
  watch: false,
  coverage: false,
  ci: false,
};

const lintPluginOptions = {
  enabled: true,
  eslint: { enabled: true },
  prettier: { enabled: true },
  stylelint: { enabled: false },
};

export default defineConfig({
  name: 'synthia-vite-demo',
  version: '1.0.0',
  description: 'Synthia Engine Vite Demo with Cache System',

  // 日志配置
  logger: {
    level: 'debug',
    color: true,
    timestamp: true,
    showLevel: true,
    file: {
      enabled: true,
      path: 'logs/synthia.log',
      dir: 'logs',
      separateByLevel: false,
    },
  },

  // 插件配置 - 使用新的函数式插件格式
  plugins: [
    // 缓存插件
    {
      name: 'cache',
      plugin: cachePlugin(cachePluginOptions),
    },
    // 文档插件
    {
      name: 'doc',
      plugin: docPlugin(docPluginOptions),
    },
    // 诊断插件
    {
      name: 'doctor',
      plugin: doctorPlugin(doctorPluginOptions),
    },
    // 测试插件
    {
      name: 'test',
      plugin: testPlugin(testPluginOption),
    },
    // 代码检查插件
    {
      name: 'lint',
      plugin: lintPlugin(lintPluginOptions),
    },
    // 自定义插件示例
    {
      name: 'my-custom-plugin',
      plugin: async (api, options) => {
        api.logger.info('🚀 自定义插件启动');
        api.logger.success('✅ 自定义插件加载完成');
      },
    },
  ],
});
