/**
 * HTTP 请求工具
 */
import axios from 'axios';

export class HttpClient {
  constructor(baseURL = '/api') {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

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

  async get(url, params) {
    return this.instance.get(url, { params });
  }

  async post(url, data) {
    return this.instance.post(url, data);
  }

  async put(url, data) {
    return this.instance.put(url, data);
  }

  async delete(url) {
    return this.instance.delete(url);
  }

  async patch(url, data) {
    return this.instance.patch(url, data);
  }
}

export const httpClient = new HttpClient();
