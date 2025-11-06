/**
 * 产品服务
 */
import { httpClient } from '../utils/http';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  tags?: string[];
  sortBy?: 'price' | 'rating' | 'createdAt' | 'name';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class ProductService {
  async getProducts(filters?: ProductFilters): Promise<ProductListResponse> {
    return httpClient.get<ProductListResponse>('/products', filters);
  }

  async getProduct(id: string): Promise<Product> {
    return httpClient.get<Product>(`/products/${id}`);
  }

  async createProduct(
    data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Product> {
    return httpClient.post<Product>('/products', data);
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    return httpClient.put<Product>(`/products/${id}`, data);
  }

  async deleteProduct(id: string): Promise<void> {
    return httpClient.delete(`/products/${id}`);
  }

  async getCategories(): Promise<string[]> {
    return httpClient.get<string[]>('/products/categories');
  }

  async getTags(): Promise<string[]> {
    return httpClient.get<string[]>('/products/tags');
  }

  async getFeaturedProducts(limit: number = 10): Promise<Product[]> {
    return httpClient.get<Product[]>('/products/featured', { limit });
  }

  async getRelatedProducts(
    productId: string,
    limit: number = 5
  ): Promise<Product[]> {
    return httpClient.get<Product[]>(`/products/${productId}/related`, {
      limit,
    });
  }

  async searchProducts(query: string, limit: number = 20): Promise<Product[]> {
    return httpClient.get<Product[]>('/products/search', { q: query, limit });
  }
}

export const productService = new ProductService();
