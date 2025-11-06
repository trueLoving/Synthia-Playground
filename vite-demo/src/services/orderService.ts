/**
 * 订单服务
 */
import { httpClient } from '../utils/http';
import type { Product } from './productService';

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreateOrderData {
  items: Array<{ productId: string; quantity: number }>;
  shippingAddress: Address;
  paymentMethod: string;
}

export class OrderService {
  async createOrder(data: CreateOrderData): Promise<Order> {
    return httpClient.post<Order>('/orders', data);
  }

  async getOrders(params?: {
    page?: number;
    limit?: number;
    status?: Order['status'];
  }): Promise<{
    orders: Order[];
    total: number;
    page: number;
    limit: number;
  }> {
    return httpClient.get('/orders', params);
  }

  async getOrder(id: string): Promise<Order> {
    return httpClient.get<Order>(`/orders/${id}`);
  }

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    return httpClient.patch<Order>(`/orders/${id}/status`, { status });
  }

  async cancelOrder(id: string): Promise<Order> {
    return httpClient.post<Order>(`/orders/${id}/cancel`);
  }

  async getOrderHistory(userId: string): Promise<Order[]> {
    return httpClient.get<Order[]>(`/orders/user/${userId}`);
  }

  async getOrderStats(): Promise<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: Record<string, number>;
  }> {
    return httpClient.get('/orders/stats');
  }
}

export const orderService = new OrderService();
