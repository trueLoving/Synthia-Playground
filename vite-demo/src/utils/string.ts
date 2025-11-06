/**
 * 字符串工具函数
 */
import _ from 'lodash';

export class StringUtil {
  /**
   * 首字母大写
   */
  static capitalize(str: string): string {
    return _.capitalize(str);
  }

  /**
   * 每个单词首字母大写
   */
  static startCase(str: string): string {
    return _.startCase(str);
  }

  /**
   * 驼峰命名
   */
  static camelCase(str: string): string {
    return _.camelCase(str);
  }

  /**
   * 下划线命名
   */
  static snakeCase(str: string): string {
    return _.snakeCase(str);
  }

  /**
   * 短横线命名
   */
  static kebabCase(str: string): string {
    return _.kebabCase(str);
  }

  /**
   * 帕斯卡命名
   */
  static pascalCase(str: string): string {
    return _.upperFirst(_.camelCase(str));
  }

  /**
   * 截断字符串
   */
  static truncate(
    str: string,
    length: number,
    omission: string = '...'
  ): string {
    return _.truncate(str, { length, omission });
  }

  /**
   * 去除空格
   */
  static trim(str: string): string {
    return str.trim();
  }

  /**
   * 去除前后空格
   */
  static trimStart(str: string): string {
    return str.trimStart();
  }

  /**
   * 去除后空格
   */
  static trimEnd(str: string): string {
    return str.trimEnd();
  }

  /**
   * 填充字符串
   */
  static pad(str: string, length: number, chars: string = ' '): string {
    return _.pad(str, length, chars);
  }

  /**
   * 左填充
   */
  static padStart(str: string, length: number, chars: string = ' '): string {
    return _.padStart(str, length, chars);
  }

  /**
   * 右填充
   */
  static padEnd(str: string, length: number, chars: string = ' '): string {
    return _.padEnd(str, length, chars);
  }

  /**
   * 重复字符串
   */
  static repeat(str: string, n: number): string {
    return str.repeat(n);
  }

  /**
   * 转义 HTML
   */
  static escape(str: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return str.replace(/[&<>"']/g, m => map[m]);
  }

  /**
   * 反转义 HTML
   */
  static unescape(str: string): string {
    const map: Record<string, string> = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
    };
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, m => map[m]);
  }

  /**
   * 生成随机字符串
   */
  static random(
    length: number = 10,
    chars: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  ): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * 字符串模板替换
   */
  static template(str: string, data: Record<string, any>): string {
    return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? String(data[key]) : match;
    });
  }

  /**
   * 提取数字
   */
  static extractNumbers(str: string): number[] {
    const matches = str.match(/\d+/g);
    return matches ? matches.map(Number) : [];
  }

  /**
   * 提取字母
   */
  static extractLetters(str: string): string[] {
    const matches = str.match(/[a-zA-Z]+/g);
    return matches || [];
  }

  /**
   * 判断是否为邮箱
   */
  static isEmail(str: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  }

  /**
   * 判断是否为 URL
   */
  static isURL(str: string): boolean {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 判断是否为手机号
   */
  static isPhone(str: string): boolean {
    return /^1[3-9]\d{9}$/.test(str);
  }

  /**
   * 隐藏手机号中间四位
   */
  static maskPhone(phone: string): string {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  }

  /**
   * 隐藏邮箱
   */
  static maskEmail(email: string): string {
    const [username, domain] = email.split('@');
    const maskedUsername =
      username.length > 2
        ? username.slice(0, 2) + '*'.repeat(username.length - 2)
        : '*'.repeat(username.length);
    return `${maskedUsername}@${domain}`;
  }
}

export const stringUtil = new StringUtil();
