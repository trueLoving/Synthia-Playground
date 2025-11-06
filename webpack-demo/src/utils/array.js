/**
 * 数组工具函数
 */
import _ from 'lodash';

export class ArrayUtil {
  static unique(arr) {
    return Array.from(new Set(arr));
  }

  static uniqueBy(arr, key) {
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

  static groupBy(arr, key) {
    return _.groupBy(arr, key);
  }

  static partition(arr, predicate) {
    return [arr.filter(predicate), arr.filter(item => !predicate(item))];
  }

  static flatten(arr) {
    return arr.flat(Infinity);
  }

  static flattenDeep(arr) {
    return _.flattenDeep(arr);
  }

  static intersection(arr1, arr2) {
    return _.intersection(arr1, arr2);
  }

  static union(arr1, arr2) {
    return _.union(arr1, arr2);
  }

  static difference(arr1, arr2) {
    return _.difference(arr1, arr2);
  }

  static chunk(arr, size) {
    return _.chunk(arr, size);
  }

  static shuffle(arr) {
    return _.shuffle(arr);
  }

  static random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static randomN(arr, n) {
    const shuffled = this.shuffle(arr);
    return shuffled.slice(0, n);
  }

  static sortBy(arr, ...keys) {
    return _.sortBy(arr, ...keys);
  }

  static sortByDesc(arr, key) {
    return _.orderBy(arr, [key], ['desc']);
  }

  static sum(arr) {
    return arr.reduce((sum, val) => sum + val, 0);
  }

  static average(arr) {
    if (arr.length === 0) return 0;
    return this.sum(arr) / arr.length;
  }

  static max(arr) {
    return Math.max(...arr);
  }

  static min(arr) {
    return Math.min(...arr);
  }

  static maxBy(arr, key) {
    return _.maxBy(arr, key);
  }

  static minBy(arr, key) {
    return _.minBy(arr, key);
  }

  static countBy(arr, key) {
    return _.countBy(arr, key);
  }

  static compact(arr) {
    return _.compact(arr);
  }

  static fill(length, value) {
    return Array(length).fill(value);
  }

  static range(start, end, step = 1) {
    return _.range(start, end, step);
  }
}

// 将静态方法导出为对象
export const arrayUtil = {
  unique: ArrayUtil.unique,
  uniqueBy: ArrayUtil.uniqueBy,
  groupBy: ArrayUtil.groupBy,
  partition: ArrayUtil.partition,
  flatten: ArrayUtil.flatten,
  flattenDeep: ArrayUtil.flattenDeep,
  intersection: ArrayUtil.intersection,
  union: ArrayUtil.union,
  difference: ArrayUtil.difference,
  chunk: ArrayUtil.chunk,
  shuffle: ArrayUtil.shuffle,
  random: ArrayUtil.random,
  randomN: ArrayUtil.randomN,
  sortBy: ArrayUtil.sortBy,
  sortByDesc: ArrayUtil.sortByDesc,
  sum: ArrayUtil.sum,
  average: ArrayUtil.average,
  max: ArrayUtil.max,
  min: ArrayUtil.min,
  maxBy: ArrayUtil.maxBy,
  minBy: ArrayUtil.minBy,
  countBy: ArrayUtil.countBy,
  compact: ArrayUtil.compact,
  fill: ArrayUtil.fill,
  range: ArrayUtil.range,
};
