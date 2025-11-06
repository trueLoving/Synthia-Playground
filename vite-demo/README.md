# Vite Demo（Vue）

示例项目展示如何在 Vite + Vue 项目中使用 Synthia CLI。

## 脚本

```bash
pnpm install

# 开发
pnpm dev       # 等价于 synthia dev

# 构建
pnpm build     # 等价于 synthia build

# 预览
pnpm preview   # 等价于 synthia serve
```

## Synthia 配置

项目根目录有 `synthia.config.js`，可在其中启用插件：

```js
module.exports = {
  plugins: ['synthia-cache', 'synthia-doctor'],
};
```

## 相关文件

- `vite.config.ts`: Vite 配置
- `src/`: 源码目录（`main.ts`、`App.vue`）
- `synthia.config.js`: Synthia 插件配置
