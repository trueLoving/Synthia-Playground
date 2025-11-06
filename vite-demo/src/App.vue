<template>
  <div class="app">
    <header class="header">
      <h1>🚀 Synthia Engine Vite Demo</h1>
      <p>体验统一前端工程化工具集</p>
    </header>

    <main class="main">
      <div class="features">
        <div class="feature-card">
          <h3>🏗️ 统一构建</h3>
          <p>Webpack5/Vite 统一构建流程</p>
        </div>

        <div class="feature-card">
          <h3>⚡ 智能缓存</h3>
          <p>本地哈希 + 云端缓存方案</p>
        </div>

        <div class="feature-card">
          <h3>🔍 性能分析</h3>
          <p>H-Doctor 智能诊断工具</p>
        </div>

        <div class="feature-card">
          <h3>📚 知识管理</h3>
          <p>Vitepress + 知识图谱检索</p>
        </div>
      </div>

      <div class="stats">
        <h2>性能数据</h2>
        <div class="stat-grid">
          <div class="stat-item">
            <span class="stat-number">31%</span>
            <span class="stat-label">构建产物精简</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">40%</span>
            <span class="stat-label">CI 时间减少</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">60%</span>
            <span class="stat-label">咨询量下降</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-label">插件复用率</span>
          </div>
        </div>
      </div>

      <div v-if="loading" class="loading-section">
        <p>正在加载数据...</p>
      </div>

      <div v-else class="demo-section">
        <h2>功能演示</h2>

        <!-- 产品列表 -->
        <div class="products-section">
          <h3>产品列表 ({{ stats.totalProducts }} 个产品)</h3>
          <div class="products-grid">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              @click="handleProductClick"
              @add-to-cart="handleAddToCart"
            />
          </div>
        </div>

        <!-- 数据表格 -->
        <div class="table-section">
          <h3>产品数据表格</h3>
          <DataTable
            :columns="tableColumns"
            :data="products"
            :loading="false"
            row-key="id"
          />
        </div>

        <!-- 图表 -->
        <div class="chart-section">
          <h3>产品价格分布图表</h3>
          <Chart :option="chartOption" height="400px" />
        </div>

        <!-- 统计信息 -->
        <div class="info-section">
          <div class="info-card">
            <h3>工具函数库</h3>
            <p>包含数组、字符串、日期、对象等工具函数</p>
            <ul>
              <li>数组工具：sum, average, max, unique, groupBy 等</li>
              <li>字符串工具：isEmail, isPhone, camelCase, kebabCase 等</li>
              <li>日期工具：format, diffInDays, isToday 等</li>
              <li>对象工具：cloneDeep, merge, flatten 等</li>
            </ul>
          </div>
          <div class="info-card">
            <h3>服务模块</h3>
            <p>认证、用户、产品、订单等服务</p>
            <ul>
              <li>认证服务：登录、注册、Token 管理</li>
              <li>用户服务：用户信息、头像上传、密码修改</li>
              <li>产品服务：产品 CRUD、搜索、分类</li>
              <li>订单服务：订单管理、状态更新、统计</li>
            </ul>
          </div>
          <div class="info-card">
            <h3>组件库</h3>
            <p>产品卡片、数据表格、图表等组件</p>
            <ul>
              <li>ProductCard：产品展示卡片组件</li>
              <li>DataTable：可配置的数据表格组件</li>
              <li>Chart：基于 ECharts 的图表组件</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { arrayUtil } from './utils/array';
import { dateUtil } from './utils/date';
import { stringUtil } from './utils/string';
import { objectUtil } from './utils/object';
import { storage } from './utils/storage';
import { httpClient } from './utils/http';
import { productService } from './services/productService';
import { orderService } from './services/orderService';
import { authService } from './services/authService';
import ProductCard from './components/ProductCard.vue';
import DataTable from './components/DataTable.vue';
import Chart from './components/Chart.vue';
import type { Product } from './services/productService';

const products = ref<Product[]>([]);
const orders = ref<any[]>([]);
const loading = ref(false);
const stats = ref({
  totalProducts: 0,
  totalOrders: 0,
  averagePrice: 0,
});

// 模拟产品数据
const mockProducts: Product[] = [
  {
    id: '1',
    name: '高性能笔记本电脑',
    description: '搭载最新处理器，适合开发工作',
    price: 8999,
    image: 'https://via.placeholder.com/300',
    category: '电子产品',
    stock: 10,
    rating: 4.8,
    reviews: 256,
    tags: ['热门', '推荐', '高性能'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: '无线机械键盘',
    description: '机械轴体，适合长时间打字',
    price: 599,
    image: 'https://via.placeholder.com/300',
    category: '外设',
    stock: 25,
    rating: 4.5,
    reviews: 189,
    tags: ['机械轴', '无线'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: '4K 显示器',
    description: '27寸 4K IPS 显示器，色彩精准',
    price: 2499,
    image: 'https://via.placeholder.com/300',
    category: '显示器',
    stock: 0,
    rating: 4.6,
    reviews: 142,
    tags: ['4K', 'IPS', '专业'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'USB-C Hub',
    description: '多接口扩展坞，支持 4K 输出',
    price: 299,
    image: 'https://via.placeholder.com/300',
    category: '配件',
    stock: 50,
    rating: 4.3,
    reviews: 98,
    tags: ['扩展坞', 'USB-C'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// 表格列配置
const tableColumns = [
  { key: 'id', title: 'ID', width: '100px' },
  { key: 'name', title: '产品名称', width: '200px' },
  { key: 'category', title: '分类', width: '120px' },
  {
    key: 'price',
    title: '价格',
    width: '120px',
    formatter: (value: number) => `¥${value.toFixed(2)}`,
  },
  {
    key: 'stock',
    title: '库存',
    width: '100px',
    formatter: (value: number) => (value > 0 ? value : '缺货'),
  },
  { key: 'rating', title: '评分', width: '100px' },
];

// 图表配置
const chartOption = computed(() => ({
  title: {
    text: '产品价格分布',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: products.value.map(p => p.name),
  },
  yAxis: {
    type: 'value',
    name: '价格 (¥)',
  },
  series: [
    {
      name: '价格',
      type: 'bar',
      data: products.value.map(p => p.price),
      itemStyle: {
        color: '#667eea',
      },
    },
  ],
}));

onMounted(async () => {
  console.log('Synthia Engine Vite Demo 已启动');

  // 初始化服务
  try {
    loading.value = true;

    // 使用各种工具函数
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const sum = arrayUtil.sum(testArray);
    const avg = arrayUtil.average(testArray);
    const max = arrayUtil.max(testArray);
    const unique = arrayUtil.unique([1, 2, 2, 3, 3, 4]);
    console.log('数组工具:', { sum, avg, max, unique });

    const today = dateUtil.format(new Date());
    const isToday = dateUtil.isToday(new Date());
    const diffDays = dateUtil.diffInDays(
      new Date(),
      dateUtil.subtractDays(new Date(), 7)
    );
    console.log('日期工具:', { today, isToday, diffDays });

    const email = 'test@example.com';
    const phone = '13800138000';
    const isEmail = stringUtil.isEmail(email);
    const isPhone = stringUtil.isPhone(phone);
    const camelCase = stringUtil.camelCase('hello world');
    console.log('字符串工具:', { isEmail, isPhone, camelCase });

    // 对象工具
    const testObj = { a: 1, b: { c: 2, d: { e: 3 } } };
    const flattened = objectUtil.flatten(testObj);
    console.log('对象工具:', { flattened });

    // 存储工具
    storage.set('test_key', { data: 'test' }, 3600000);
    const stored = storage.get('test_key');
    console.log('存储工具:', { stored });

    // 模拟数据加载
    await new Promise(resolve => setTimeout(resolve, 800));

    // 设置产品数据
    products.value = mockProducts;
    stats.value = {
      totalProducts: products.value.length,
      totalOrders: orders.value.length,
      averagePrice: arrayUtil.average(products.value.map(p => p.price)),
    };

    // 模拟订单数据
    orders.value = [
      { id: '1', productId: '1', quantity: 2, total: 17998, status: '已完成' },
      { id: '2', productId: '2', quantity: 1, total: 599, status: '处理中' },
      { id: '3', productId: '4', quantity: 3, total: 897, status: '待支付' },
    ];

    // 使用服务（模拟）
    console.log('产品服务:', await productService.getProducts());
    console.log('订单服务:', await orderService.getOrders());

    loading.value = false;
  } catch (error) {
    console.error('初始化错误:', error);
    loading.value = false;
  }
});

const handleProductClick = (product: Product) => {
  console.log('点击产品:', product);
};

const handleAddToCart = (product: Product) => {
  console.log('添加到购物车:', product);
  // 这里可以调用订单服务
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.header {
  text-align: center;
  padding: 60px 20px 40px;
}

.header h1 {
  font-size: 3rem;
  margin: 0 0 20px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.header p {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 60px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin: 0 0 15px 0;
}

.feature-card p {
  margin: 0;
  opacity: 0.9;
}

.stats {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stats h2 {
  text-align: center;
  margin: 0 0 30px 0;
  font-size: 2rem;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

.loading-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  margin-top: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.demo-section {
  margin-top: 30px;
}

.demo-section h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.demo-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.demo-card h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}

.demo-card p {
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.products-section,
.table-section,
.chart-section {
  margin-top: 40px;
}

.products-section h3,
.table-section h3,
.chart-section h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.table-section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.chart-section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.info-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.info-card h3 {
  margin: 0 0 12px 0;
  font-size: 1.3rem;
}

.info-card p {
  margin: 0 0 16px 0;
  opacity: 0.9;
  font-size: 0.95rem;
}

.info-card ul {
  margin: 0;
  padding-left: 20px;
  list-style-type: disc;
}

.info-card li {
  margin: 8px 0;
  opacity: 0.85;
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>
