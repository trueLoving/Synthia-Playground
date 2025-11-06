/**
 * 对象工具函数
 */
import _ from 'lodash';

export class ObjectUtil {
  /**
   * 深拷贝
   */
  static cloneDeep<T>(obj: T): T {
    return _.cloneDeep(obj);
  }

  /**
   * 浅拷贝
   */
  static clone<T>(obj: T): T {
    return _.clone(obj);
  }

  /**
   * 合并对象
   */
  static merge<T>(target: T, ...sources: Partial<T>[]): T {
    return _.merge(target, ...sources);
  }

  /**
   * 深度合并
   */
  static mergeWith<T>(
    target: T,
    source: Partial<T>,
    customizer?: _.Many<_.MergeWithCustomizer>
  ): T {
    return _.mergeWith(target, source, customizer);
  }

  /**
   * 选择对象属性
   */
  static pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
    return _.pick(obj, keys);
  }

  /**
   * 排除对象属性
   */
  static omit<T, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
    return _.omit(obj, keys);
  }

  /**
   * 获取嵌套属性值
   */
  static get<T>(obj: any, path: string | string[], defaultValue?: T): T {
    return _.get(obj, path, defaultValue) as T;
  }

  /**
   * 设置嵌套属性值
   */
  static set(obj: any, path: string | string[], value: any): any {
    return _.set(obj, path, value);
  }

  /**
   * 检查是否有路径
   */
  static has(obj: any, path: string | string[]): boolean {
    return _.has(obj, path);
  }

  /**
   * 扁平化对象
   */
  static flatten(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    function flattenObject(current: any, prefix: string = '') {
      for (const key in current) {
        if (current.hasOwnProperty(key)) {
          const newKey = prefix ? `${prefix}.${key}` : key;
          if (
            typeof current[key] === 'object' &&
            current[key] !== null &&
            !Array.isArray(current[key])
          ) {
            flattenObject(current[key], newKey);
          } else {
            result[newKey] = current[key];
          }
        }
      }
    }

    flattenObject(obj);
    return result;
  }

  /**
   * 反扁平化对象
   */
  static unflatten(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const keys = key.split('.');
        let current = result;

        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = obj[key];
      }
    }

    return result;
  }

  /**
   * 对象键值对反转
   */
  static invert(obj: Record<string, any>): Record<string, string> {
    return _.invert(obj);
  }

  /**
   * 对象键值映射
   */
  static mapValues<T, U>(
    obj: Record<string, T>,
    iteratee: (value: T, key: string) => U
  ): Record<string, U> {
    return _.mapValues(obj, iteratee);
  }

  /**
   * 对象键映射
   */
  static mapKeys<T>(
    obj: Record<string, T>,
    iteratee: (value: T, key: string) => string
  ): Record<string, T> {
    return _.mapKeys(obj, iteratee);
  }

  /**
   * 过滤对象
   */
  static pickBy<T>(
    obj: Record<string, T>,
    predicate: (value: T, key: string) => boolean
  ): Record<string, T> {
    return _.pickBy(obj, predicate);
  }

  /**
   * 对象是否为空
   */
  static isEmpty(obj: any): boolean {
    return _.isEmpty(obj);
  }

  /**
   * 对象是否相等（深度比较）
   */
  static isEqual(a: any, b: any): boolean {
    return _.isEqual(a, b);
  }

  /**
   * 判断是否为对象
   */
  static isObject(value: any): boolean {
    return _.isObject(value);
  }

  /**
   * 判断是否为纯对象
   */
  static isPlainObject(value: any): boolean {
    return _.isPlainObject(value);
  }

  /**
   * 获取对象所有键
   */
  static keys<T extends Record<string, any>>(obj: T): Array<keyof T> {
    return Object.keys(obj) as Array<keyof T>;
  }

  /**
   * 获取对象所有值
   */
  static values<T>(obj: Record<string, T>): T[] {
    return Object.values(obj);
  }

  /**
   * 获取对象所有键值对
   */
  static entries<T>(obj: Record<string, T>): Array<[string, T]> {
    return Object.entries(obj);
  }
}

export const objectUtil = new ObjectUtil();
