/**
 * API 服务
 */
import { httpClient } from '../utils/http.js';

export class ApiService {
  constructor() {
    this.baseURL = '/api';
  }

  async getUsers(params) {
    return httpClient.get('/users', params);
  }

  async getUser(id) {
    return httpClient.get(`/users/${id}`);
  }

  async createUser(userData) {
    return httpClient.post('/users', userData);
  }

  async updateUser(id, userData) {
    return httpClient.put(`/users/${id}`, userData);
  }

  async deleteUser(id) {
    return httpClient.delete(`/users/${id}`);
  }

  async getProducts(params) {
    return httpClient.get('/products', params);
  }

  async getProduct(id) {
    return httpClient.get(`/products/${id}`);
  }

  async createProduct(productData) {
    return httpClient.post('/products', productData);
  }

  async updateProduct(id, productData) {
    return httpClient.put(`/products/${id}`, productData);
  }

  async deleteProduct(id) {
    return httpClient.delete(`/products/${id}`);
  }

  async getOrders(params) {
    return httpClient.get('/orders', params);
  }

  async getOrder(id) {
    return httpClient.get(`/orders/${id}`);
  }

  async createOrder(orderData) {
    return httpClient.post('/orders', orderData);
  }

  async updateOrder(id, orderData) {
    return httpClient.put(`/orders/${id}`, orderData);
  }

  async deleteOrder(id) {
    return httpClient.delete(`/orders/${id}`);
  }
}

export const apiService = new ApiService();
