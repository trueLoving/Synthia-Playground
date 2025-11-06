/**
 * 日期时间工具函数
 */
import dayjs from 'dayjs';

export class DateUtil {
  static format(date, formatStr = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).format(formatStr);
  }

  static formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
  }

  static formatTime(date) {
    return dayjs(date).format('HH:mm:ss');
  }

  static formatDateTime(date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  }

  static isToday(date) {
    return dayjs(date).isSame(dayjs(), 'day');
  }

  static isYesterday(date) {
    return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
  }

  static isThisWeek(date) {
    return dayjs(date).isSame(dayjs(), 'week');
  }

  static isThisMonth(date) {
    return dayjs(date).isSame(dayjs(), 'month');
  }

  static isThisYear(date) {
    return dayjs(date).isSame(dayjs(), 'year');
  }

  static addDays(date, days) {
    return dayjs(date).add(days, 'day').toDate();
  }

  static subtractDays(date, days) {
    return dayjs(date).subtract(days, 'day').toDate();
  }

  static addMonths(date, months) {
    return dayjs(date).add(months, 'month').toDate();
  }

  static subtractMonths(date, months) {
    return dayjs(date).subtract(months, 'month').toDate();
  }

  static addYears(date, years) {
    return dayjs(date).add(years, 'year').toDate();
  }

  static subtractYears(date, years) {
    return dayjs(date).subtract(years, 'year').toDate();
  }

  static diffInDays(date1, date2) {
    return dayjs(date1).diff(dayjs(date2), 'day');
  }

  static diffInHours(date1, date2) {
    return dayjs(date1).diff(dayjs(date2), 'hour');
  }

  static diffInMinutes(date1, date2) {
    return dayjs(date1).diff(dayjs(date2), 'minute');
  }

  static startOfDay(date) {
    return dayjs(date).startOf('day').toDate();
  }

  static endOfDay(date) {
    return dayjs(date).endOf('day').toDate();
  }

  static startOfWeek(date) {
    return dayjs(date).startOf('week').toDate();
  }

  static endOfWeek(date) {
    return dayjs(date).endOf('week').toDate();
  }

  static startOfMonth(date) {
    return dayjs(date).startOf('month').toDate();
  }

  static endOfMonth(date) {
    return dayjs(date).endOf('month').toDate();
  }

  static getDateRange(start, end) {
    const dates = [];
    let current = dayjs(start);
    const endDate = dayjs(end);

    while (current.isBefore(endDate) || current.isSame(endDate)) {
      dates.push(current.toDate());
      current = current.add(1, 'day');
    }

    return dates;
  }
}

// 将静态方法导出为对象
export const dateUtil = {
  format: DateUtil.format,
  formatDate: DateUtil.formatDate,
  formatTime: DateUtil.formatTime,
  formatDateTime: DateUtil.formatDateTime,
  isToday: DateUtil.isToday,
  isYesterday: DateUtil.isYesterday,
  isThisWeek: DateUtil.isThisWeek,
  isThisMonth: DateUtil.isThisMonth,
  isThisYear: DateUtil.isThisYear,
  addDays: DateUtil.addDays,
  subtractDays: DateUtil.subtractDays,
  addMonths: DateUtil.addMonths,
  subtractMonths: DateUtil.subtractMonths,
  addYears: DateUtil.addYears,
  subtractYears: DateUtil.subtractYears,
  diffInDays: DateUtil.diffInDays,
  diffInHours: DateUtil.diffInHours,
  diffInMinutes: DateUtil.diffInMinutes,
  startOfDay: DateUtil.startOfDay,
  endOfDay: DateUtil.endOfDay,
  startOfWeek: DateUtil.startOfWeek,
  endOfWeek: DateUtil.endOfWeek,
  startOfMonth: DateUtil.startOfMonth,
  endOfMonth: DateUtil.endOfMonth,
  getDateRange: DateUtil.getDateRange,
};
