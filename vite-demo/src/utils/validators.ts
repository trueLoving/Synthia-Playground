/**
 * 验证工具函数集合
 */

export function isEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isPhone(phone: string): boolean {
  const regex = /^1[3-9]\d{9}$/;
  return regex.test(phone);
}

export function isIdCard(idCard: string): boolean {
  const regex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return regex.test(idCard);
}

export function isPassword(password: string, minLength: number = 8): boolean {
  return password.length >= minLength;
}

export function isStrongPassword(password: string): boolean {
  // 至少8位，包含大小写字母、数字和特殊字符
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === 'string' && value.trim().length === 0) {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }
  return false;
}

export function isNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value);
}

export function isInteger(value: any): boolean {
  return isNumber(value) && Number.isInteger(value);
}

export function isPositive(value: number): boolean {
  return isNumber(value) && value > 0;
}

export function isNegative(value: number): boolean {
  return isNumber(value) && value < 0;
}

export function isInRange(value: number, min: number, max: number): boolean {
  return isNumber(value) && value >= min && value <= max;
}

export function matchesPattern(
  value: string,
  pattern: RegExp | string
): boolean {
  const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern);
  return regex.test(value);
}

export function hasLength(value: string | any[], length: number): boolean {
  return value.length === length;
}

export function minLength(value: string | any[], min: number): boolean {
  return value.length >= min;
}

export function maxLength(value: string | any[], max: number): boolean {
  return value.length <= max;
}
