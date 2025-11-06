import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Header } from './components/Header.js';
import { FeatureCard } from './components/FeatureCard.js';
import { ProductCard } from './components/ProductCard.js';
import { httpClient } from './utils/http.js';
import { storage } from './utils/storage.js';
import { arrayUtil } from './utils/array.js';
import { dateUtil } from './utils/date.js';
import { apiService } from './services/apiService.js';

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('Synthia Webpack Demo 已启动');

    // 初始化服务
    const init = async () => {
      try {
        setLoading(true);
        // 模拟数据加载
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 使用各种工具函数
        const testArray = [1, 2, 3, 4, 5];
        const sum = arrayUtil.sum(testArray);
        console.log('数组求和:', sum);

        const today = dateUtil.format(new Date());
        console.log('今天的日期:', today);

        // 模拟产品数据
        const mockProducts = [
          {
            id: '1',
            name: '产品 1',
            description: '这是产品 1 的描述',
            price: 99.99,
            rating: 4.5,
            reviews: 120,
            stock: 10,
            image: 'https://via.placeholder.com/300',
          },
          {
            id: '2',
            name: '产品 2',
            description: '这是产品 2 的描述',
            price: 199.99,
            rating: 4.8,
            reviews: 89,
            stock: 5,
            image: 'https://via.placeholder.com/300',
          },
          {
            id: '3',
            name: '产品 3',
            description: '这是产品 3 的描述',
            price: 299.99,
            rating: 4.2,
            reviews: 56,
            stock: 0,
            image: 'https://via.placeholder.com/300',
          },
        ];

        setProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error('初始化错误:', error);
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleAddToCart = product => {
    console.log('添加到购物车:', product);
  };

  const features = [
    {
      icon: '⚡',
      title: 'Webpack 5',
      description: '现代化的模块打包工具',
      features: ['模块化', '代码分割', 'Tree Shaking'],
    },
    {
      icon: '⚛️',
      title: 'React 18',
      description: '最新的 React 版本',
      features: ['Hooks', '并发渲染', 'Suspense'],
    },
    {
      icon: '🛠️',
      title: 'Synthia CLI',
      description: '统一的工程化命令行工具',
      features: ['统一接口', '插件系统', '缓存优化'],
    },
    {
      icon: '🎨',
      title: 'CSS Modules',
      description: '组件化的样式管理',
      features: ['作用域隔离', '模块化', '可维护'],
    },
  ];

  return (
    <div className='app'>
      <Header
        title='🚀 Synthia Webpack Demo'
        subtitle='这是一个使用 Synthia CLI 和 Webpack 的示例项目'
      />

      <main className='app-main'>
        <div className='feature-grid'>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {loading && (
          <div className='loading-section'>
            <p>正在加载数据...</p>
          </div>
        )}

        {!loading && (
          <div className='products-section'>
            <h2>产品列表</h2>
            <div className='products-grid'>
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
