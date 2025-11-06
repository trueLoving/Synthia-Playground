import React from 'react';
import './ProductCard.css';

export function ProductCard({ product, onAddToCart }) {
  return (
    <div className='product-card'>
      <div className='product-image'>
        <img src={product.image || '/placeholder.png'} alt={product.name} />
        {product.stock === 0 && <div className='out-of-stock'>缺货</div>}
      </div>
      <div className='product-info'>
        <h3 className='product-name'>{product.name}</h3>
        <p className='product-description'>{product.description}</p>
        <div className='product-meta'>
          <div className='product-rating'>
            <span className='rating-value'>{product.rating || 0}</span>
            <span className='rating-stars'>★★★★★</span>
            <span className='reviews-count'>({product.reviews || 0})</span>
          </div>
          <div className='product-price'>
            ¥{product.price?.toFixed(2) || '0.00'}
          </div>
        </div>
        <button
          className='add-to-cart-btn'
          disabled={product.stock === 0}
          onClick={() => onAddToCart && onAddToCart(product)}
        >
          {product.stock === 0 ? '缺货' : '加入购物车'}
        </button>
      </div>
    </div>
  );
}
