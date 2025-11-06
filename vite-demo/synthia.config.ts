import { defineConfig } from 'synthia-cli';
import { docPlugin } from 'synthia-doc';
import type { DocPluginOptions } from 'synthia-doc';
import { cachePlugin } from 'synthia-cache';
import type { CachePluginOptions } from 'synthia-cache';
import { doctorPlugin } from 'synthia-doctor';
import type { DoctorPluginOptions } from 'synthia-doctor';
import { testPlugin } from 'synthia-test';
import type { TestPluginOptions } from 'synthia-test';
import { lintPlugin } from 'synthia-lint';
import type { LintPluginOptions } from 'synthia-lint';

const docPluginOptions: DocPluginOptions = {
  enabled: true,
  type: 'local' as const,
  directory: '.synthia-doc',
  ttl: 3600000,
  maxSize: '100MB',
  compression: true,
  strategy: 'lru' as const,
};
const cachePluginOptions: CachePluginOptions = {
  enabled: true,
  local: {
    dir: '.synthia-cache',
    maxSize: 100 * 1024 * 1024,
    ttl: 7 * 24 * 60 * 60 * 1000,
    compression: true,
  },
};

const doctorPluginOptions: DoctorPluginOptions = {
  enabled: true,
  rules: [],
  fix: false,
  output: 'console',
  format: 'table' as const,
};

const testPluginOptions: TestPluginOptions = {
  enabled: true,
  framework: 'vitest',
  watch: false,
  coverage: false,
  ci: false,
};

const lintPluginOptions: LintPluginOptions = {
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
      plugin: testPlugin(testPluginOptions),
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
