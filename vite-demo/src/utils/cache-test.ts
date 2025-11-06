/**
 * 缓存测试工具
 * 用于在浏览器中测试缓存效果
 */

export interface CacheTestResult {
  name: string;
  coldStart: number;
  warmStart: number;
  improvement: number;
  timestamp: string;
}

export class CacheTestUtils {
  /**
   * 测试资源加载缓存效果
   */
  static async testResourceCache(): Promise<CacheTestResult> {
    const testResource = '/src/main.ts';

    // 清除缓存（如果可能）
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
    }

    // 冷启动测试
    const coldStart = performance.now();
    try {
      await fetch(testResource, { cache: 'no-store' });
    } catch (e) {
      // 忽略错误
    }
    const coldEnd = performance.now();
    const coldTime = coldEnd - coldStart;

    // 等待一小段时间
    await new Promise(resolve => setTimeout(resolve, 100));

    // 热启动测试（使用缓存）
    const warmStart = performance.now();
    try {
      await fetch(testResource, { cache: 'default' });
    } catch (e) {
      // 忽略错误
    }
    const warmEnd = performance.now();
    const warmTime = warmEnd - warmStart;

    const improvement =
      coldTime > 0 ? ((coldTime - warmTime) / coldTime) * 100 : 0;

    return {
      name: 'Resource Cache',
      coldStart: coldTime,
      warmStart: warmTime,
      improvement,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * 测试模块缓存效果
   */
  static async testModuleCache(): Promise<CacheTestResult> {
    const moduleName = 'lodash';

    // 清除模块缓存（模拟）
    if (typeof window !== 'undefined' && 'import' in window) {
      // 冷启动：动态导入
      const coldStart = performance.now();
      try {
        const module = await import(moduleName);
        const coldEnd = performance.now();
        const coldTime = coldEnd - coldStart;

        // 热启动：再次导入（应该使用缓存）
        await new Promise(resolve => setTimeout(resolve, 50));
        const warmStart = performance.now();
        await import(moduleName);
        const warmEnd = performance.now();
        const warmTime = warmEnd - warmStart;

        const improvement =
          coldTime > 0 ? ((coldTime - warmTime) / coldTime) * 100 : 0;

        return {
          name: 'Module Cache',
          coldStart: coldTime,
          warmStart: warmTime,
          improvement,
          timestamp: new Date().toISOString(),
        };
      } catch (e) {
        return {
          name: 'Module Cache',
          coldStart: 0,
          warmStart: 0,
          improvement: 0,
          timestamp: new Date().toISOString(),
        };
      }
    }

    return {
      name: 'Module Cache',
      coldStart: 0,
      warmStart: 0,
      improvement: 0,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * 运行所有缓存测试
   */
  static async runAllTests(): Promise<CacheTestResult[]> {
    const results: CacheTestResult[] = [];

    // 测试资源缓存
    const resourceResult = await this.testResourceCache();
    results.push(resourceResult);

    // 测试模块缓存
    const moduleResult = await this.testModuleCache();
    results.push(moduleResult);

    return results;
  }

  /**
   * 格式化测试结果
   */
  static formatResult(result: CacheTestResult): string {
    return `
测试名称: ${result.name}
冷启动时间: ${result.coldStart.toFixed(2)}ms
热启动时间: ${result.warmStart.toFixed(2)}ms
性能提升: ${result.improvement.toFixed(2)}%
测试时间: ${result.timestamp}
    `.trim();
  }
}
