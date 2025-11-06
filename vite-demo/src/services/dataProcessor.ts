export interface DataPoint {
  id: string;
  value: number;
  timestamp: number;
  category: string;
}

export interface ProcessedData {
  total: number;
  average: number;
  min: number;
  max: number;
  byCategory: Record<string, number>;
  timeSeries: Array<{ timestamp: number; value: number }>;
}

export class DataProcessor {
  /**
   * 处理原始数据点
   */
  static processDataPoints(dataPoints: DataPoint[]): ProcessedData {
    if (dataPoints.length === 0) {
      return {
        total: 0,
        average: 0,
        min: 0,
        max: 0,
        byCategory: {},
        timeSeries: [],
      };
    }

    const values = dataPoints.map(dp => dp.value);
    const total = values.reduce((sum, val) => sum + val, 0);
    const average = total / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    const byCategory: Record<string, number> = {};
    dataPoints.forEach(dp => {
      byCategory[dp.category] = (byCategory[dp.category] || 0) + dp.value;
    });

    const timeSeries = dataPoints
      .map(dp => ({
        timestamp: dp.timestamp,
        value: dp.value,
      }))
      .sort((a, b) => a.timestamp - b.timestamp);

    return {
      total,
      average,
      min,
      max,
      byCategory,
      timeSeries,
    };
  }

  /**
   * 过滤数据点
   */
  static filterDataPoints(
    dataPoints: DataPoint[],
    filters: {
      category?: string;
      minValue?: number;
      maxValue?: number;
      startTime?: number;
      endTime?: number;
    }
  ): DataPoint[] {
    return dataPoints.filter(dp => {
      if (filters.category && dp.category !== filters.category) {
        return false;
      }
      if (filters.minValue !== undefined && dp.value < filters.minValue) {
        return false;
      }
      if (filters.maxValue !== undefined && dp.value > filters.maxValue) {
        return false;
      }
      if (filters.startTime !== undefined && dp.timestamp < filters.startTime) {
        return false;
      }
      if (filters.endTime !== undefined && dp.timestamp > filters.endTime) {
        return false;
      }
      return true;
    });
  }

  /**
   * 聚合数据
   */
  static aggregateData(
    dataPoints: DataPoint[],
    interval: number // 时间间隔（毫秒）
  ): ProcessedData {
    const grouped = new Map<number, DataPoint[]>();

    dataPoints.forEach(dp => {
      const intervalStart = Math.floor(dp.timestamp / interval) * interval;
      if (!grouped.has(intervalStart)) {
        grouped.set(intervalStart, []);
      }
      grouped.get(intervalStart)!.push(dp);
    });

    const aggregatedPoints: DataPoint[] = [];
    grouped.forEach((points, intervalStart) => {
      const avgValue =
        points.reduce((sum, p) => sum + p.value, 0) / points.length;
      aggregatedPoints.push({
        id: `agg-${intervalStart}`,
        value: avgValue,
        timestamp: intervalStart,
        category: points[0].category,
      });
    });

    return this.processDataPoints(aggregatedPoints);
  }

  /**
   * 生成模拟数据
   */
  static generateMockData(count: number, categories: string[]): DataPoint[] {
    const dataPoints: DataPoint[] = [];
    const now = Date.now();

    for (let i = 0; i < count; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const value = Math.random() * 1000;
      const timestamp = now - (count - i) * 1000 * 60; // 每分钟一个点

      dataPoints.push({
        id: `data-${i}`,
        value,
        timestamp,
        category,
      });
    }

    return dataPoints;
  }

  /**
   * 计算统计信息
   */
  static calculateStats(dataPoints: DataPoint[]): {
    count: number;
    sum: number;
    mean: number;
    median: number;
    stdDev: number;
    variance: number;
  } {
    if (dataPoints.length === 0) {
      return {
        count: 0,
        sum: 0,
        mean: 0,
        median: 0,
        stdDev: 0,
        variance: 0,
      };
    }

    const values = dataPoints.map(dp => dp.value).sort((a, b) => a - b);
    const count = values.length;
    const sum = values.reduce((s, v) => s + v, 0);
    const mean = sum / count;

    const median =
      count % 2 === 0
        ? (values[count / 2 - 1] + values[count / 2]) / 2
        : values[Math.floor(count / 2)];

    const variance =
      values.reduce((v, val) => v + Math.pow(val - mean, 2), 0) / count;
    const stdDev = Math.sqrt(variance);

    return {
      count,
      sum,
      mean,
      median,
      stdDev,
      variance,
    };
  }
}
