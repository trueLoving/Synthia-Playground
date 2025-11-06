/**
 * HTTP 请求工具
 */
import axios from 'axios';

export interface RequestConfig {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
}

export class HttpClient {
  public instance = axios.create({
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor(baseURL?: string) {
    if (baseURL) {
      this.instance.defaults.baseURL = baseURL;
    }

    // 请求拦截器
    this.instance.interceptors.request.use(
      config => {
        // 添加 token 等逻辑
        return config;
      },
      error => Promise.reject(error)
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      response => response.data,
      error => {
        // 错误处理逻辑
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }

  async patch<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.instance.patch(url, data, config);
  }
}

export const httpClient = new HttpClient();
