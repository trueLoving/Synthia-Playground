<template>
  <div class="product-card" @click="handleClick">
    <div class="product-image">
      <img :src="product.image" :alt="product.name" />
      <div v-if="product.stock === 0" class="out-of-stock">缺货</div>
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-meta">
        <div class="product-rating">
          <span class="rating-value">{{ product.rating }}</span>
          <span class="rating-stars">★★★★★</span>
          <span class="reviews-count">({{ product.reviews }})</span>
        </div>
        <div class="product-price">¥{{ product.price.toFixed(2) }}</div>
      </div>
      <div class="product-tags">
        <span v-for="tag in product.tags" :key="tag" class="tag">{{
          tag
        }}</span>
      </div>
      <button
        class="add-to-cart-btn"
        :disabled="product.stock === 0"
        @click.stop="handleAddToCart"
      >
        {{ product.stock === 0 ? '缺货' : '加入购物车' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../services/productService';

interface Props {
  product: Product;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [product: Product];
  addToCart: [product: Product];
}>();

const handleClick = () => {
  emit('click', props.product);
};

const handleAddToCart = () => {
  emit('addToCart', props.product);
};
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f5f5f5;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.out-of-stock {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
}

.product-info {
  padding: 16px;
}

.product-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating-value {
  font-weight: 600;
  color: #f39c12;
}

.rating-stars {
  color: #f39c12;
  font-size: 0.9rem;
}

.reviews-count {
  font-size: 0.85rem;
  color: #999;
  margin-left: 4px;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e74c3c;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.tag {
  font-size: 0.75rem;
  padding: 2px 8px;
  background: #f0f0f0;
  border-radius: 12px;
  color: #666;
}

.add-to-cart-btn {
  width: 100%;
  padding: 10px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #5568d3;
}

.add-to-cart-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
