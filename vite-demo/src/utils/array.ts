/**
 * 数组工具函数
 */
import _ from 'lodash';

export class ArrayUtil {
  /**
   * 数组去重
   */
  static unique<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
  }

  /**
   * 根据属性去重
   */
  static uniqueBy<T>(arr: T[], key: keyof T | ((item: T) => any)): T[] {
    const seen = new Set();
    return arr.filter(item => {
      const value = typeof key === 'function' ? key(item) : item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  }

  /**
   * 分组
   */
  static groupBy<T>(
    arr: T[],
    key: keyof T | ((item: T) => any)
  ): Record<string, T[]> {
    return _.groupBy(arr, key);
  }

  /**
   * 按条件分组
   */
  static partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] {
    return [arr.filter(predicate), arr.filter(item => !predicate(item))];
  }

  /**
   * 扁平化数组
   */
  static flatten<T>(arr: (T | T[])[]): T[] {
    return arr.flat(Infinity) as T[];
  }

  /**
   * 深度扁平化
   */
  static flattenDeep<T>(arr: any[]): T[] {
    return _.flattenDeep(arr) as T[];
  }

  /**
   * 数组交集
   */
  static intersection<T>(arr1: T[], arr2: T[]): T[] {
    return _.intersection(arr1, arr2);
  }

  /**
   * 数组并集
   */
  static union<T>(arr1: T[], arr2: T[]): T[] {
    return _.union(arr1, arr2);
  }

  /**
   * 数组差集
   */
  static difference<T>(arr1: T[], arr2: T[]): T[] {
    return _.difference(arr1, arr2);
  }

  /**
   * 数组分块
   */
  static chunk<T>(arr: T[], size: number): T[][] {
    return _.chunk(arr, size);
  }

  /**
   * 随机打乱
   */
  static shuffle<T>(arr: T[]): T[] {
    return _.shuffle(arr);
  }

  /**
   * 取随机元素
   */
  static random<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * 取随机多个元素
   */
  static randomN<T>(arr: T[], n: number): T[] {
    const shuffled = this.shuffle(arr);
    return shuffled.slice(0, n);
  }

  /**
   * 数组排序（支持多字段）
   */
  static sortBy<T>(arr: T[], ...keys: (keyof T | string)[]): T[] {
    return _.sortBy(arr, ...keys);
  }

  /**
   * 数组排序（降序）
   */
  static sortByDesc<T>(arr: T[], key: keyof T | ((item: T) => any)): T[] {
    return _.orderBy(arr, [key], ['desc']);
  }

  /**
   * 数组求和
   */
  static sum(arr: number[]): number {
    return arr.reduce((sum, val) => sum + val, 0);
  }

  /**
   * 数组平均值
   */
  static average(arr: number[]): number {
    if (arr.length === 0) return 0;
    return this.sum(arr) / arr.length;
  }

  /**
   * 数组最大值
   */
  static max(arr: number[]): number {
    return Math.max(...arr);
  }

  /**
   * 数组最小值
   */
  static min(arr: number[]): number {
    return Math.min(...arr);
  }

  /**
   * 根据属性求最大值
   */
  static maxBy<T>(
    arr: T[],
    key: keyof T | ((item: T) => number)
  ): T | undefined {
    return _.maxBy(arr, key);
  }

  /**
   * 根据属性求最小值
   */
  static minBy<T>(
    arr: T[],
    key: keyof T | ((item: T) => number)
  ): T | undefined {
    return _.minBy(arr, key);
  }

  /**
   * 数组计数
   */
  static countBy<T>(
    arr: T[],
    key?: keyof T | ((item: T) => any)
  ): Record<string, number> {
    return _.countBy(arr, key);
  }

  /**
   * 移除空值
   */
  static compact<T>(arr: (T | null | undefined | false | 0 | '')[]): T[] {
    return _.compact(arr);
  }

  /**
   * 填充数组
   */
  static fill<T>(length: number, value: T): T[] {
    return Array(length).fill(value);
  }

  /**
   * 生成范围数组
   */
  static range(start: number, end?: number, step: number = 1): number[] {
    return _.range(start, end, step);
  }
}

export const arrayUtil = new ArrayUtil();
