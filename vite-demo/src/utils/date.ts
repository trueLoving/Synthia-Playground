/**
 * 日期时间工具函数
 */
import dayjs from 'dayjs';

export class DateUtil {
  static format(
    date: Date | string | number,
    formatStr: string = 'YYYY-MM-DD HH:mm:ss'
  ): string {
    return dayjs(date).format(formatStr);
  }

  static formatDate(date: Date | string | number): string {
    return dayjs(date).format('YYYY-MM-DD');
  }

  static formatTime(date: Date | string | number): string {
    return dayjs(date).format('HH:mm:ss');
  }

  static formatDateTime(date: Date | string | number): string {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  }

  static formatRelative(date: Date | string | number): string {
    const now = dayjs();
    const target = dayjs(date);
    const diff = now.diff(target, 'day');
    if (diff === 0) return '今天';
    if (diff === 1) return '昨天';
    if (diff === -1) return '明天';
    if (diff < 7) return `${diff}天前`;
    return target.format('YYYY-MM-DD');
  }

  static formatDistance(date: Date | string | number): string {
    const now = dayjs();
    const target = dayjs(date);
    const diff = now.diff(target, 'minute');
    if (diff < 1) return '刚刚';
    if (diff < 60) return `${diff}分钟前`;
    const hours = now.diff(target, 'hour');
    if (hours < 24) return `${hours}小时前`;
    const days = now.diff(target, 'day');
    if (days < 30) return `${days}天前`;
    return target.format('YYYY-MM-DD');
  }

  static isToday(date: Date | string | number): boolean {
    return dayjs(date).isSame(dayjs(), 'day');
  }

  static isYesterday(date: Date | string | number): boolean {
    return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
  }

  static isThisWeek(date: Date | string | number): boolean {
    return dayjs(date).isSame(dayjs(), 'week');
  }

  static isThisMonth(date: Date | string | number): boolean {
    return dayjs(date).isSame(dayjs(), 'month');
  }

  static isThisYear(date: Date | string | number): boolean {
    return dayjs(date).isSame(dayjs(), 'year');
  }

  static addDays(date: Date | string | number, days: number): Date {
    return dayjs(date).add(days, 'day').toDate();
  }

  static subtractDays(date: Date | string | number, days: number): Date {
    return dayjs(date).subtract(days, 'day').toDate();
  }

  static addMonths(date: Date | string | number, months: number): Date {
    return dayjs(date).add(months, 'month').toDate();
  }

  static subtractMonths(date: Date | string | number, months: number): Date {
    return dayjs(date).subtract(months, 'month').toDate();
  }

  static addYears(date: Date | string | number, years: number): Date {
    return dayjs(date).add(years, 'year').toDate();
  }

  static subtractYears(date: Date | string | number, years: number): Date {
    return dayjs(date).subtract(years, 'year').toDate();
  }

  static diffInDays(
    date1: Date | string | number,
    date2: Date | string | number
  ): number {
    return dayjs(date1).diff(dayjs(date2), 'day');
  }

  static diffInHours(
    date1: Date | string | number,
    date2: Date | string | number
  ): number {
    return dayjs(date1).diff(dayjs(date2), 'hour');
  }

  static diffInMinutes(
    date1: Date | string | number,
    date2: Date | string | number
  ): number {
    return dayjs(date1).diff(dayjs(date2), 'minute');
  }

  static startOfDay(date: Date | string | number): Date {
    return dayjs(date).startOf('day').toDate();
  }

  static endOfDay(date: Date | string | number): Date {
    return dayjs(date).endOf('day').toDate();
  }

  static startOfWeek(date: Date | string | number): Date {
    return dayjs(date).startOf('week').toDate();
  }

  static endOfWeek(date: Date | string | number): Date {
    return dayjs(date).endOf('week').toDate();
  }

  static startOfMonth(date: Date | string | number): Date {
    return dayjs(date).startOf('month').toDate();
  }

  static endOfMonth(date: Date | string | number): Date {
    return dayjs(date).endOf('month').toDate();
  }

  static getDateRange(
    start: Date | string | number,
    end: Date | string | number
  ): Date[] {
    const dates: Date[] = [];
    let current = dayjs(start);
    const endDate = dayjs(end);

    while (current.isBefore(endDate) || current.isSame(endDate)) {
      dates.push(current.toDate());
      current = current.add(1, 'day');
    }

    return dates;
  }
}

export const dateUtil = new DateUtil();
