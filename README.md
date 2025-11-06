# Synthia Engine Playground

本仓库包含基于 Vite（Vue 3）与 Webpack（React 18）的两个示例项目，演示如何使用 Synthia CLI 进行统一的开发、构建与服务启动。

## 项目结构

- `vite-demo/` - 基于 Vite 的 Vue.js 示例项目
- `webpack-demo/` - 基于 Webpack 的 React.js 示例项目

## 快速开始

### Vite Demo（使用 Synthia CLI）

```bash
cd vite-demo
pnpm install
pnpm dev          # 使用 Synthia CLI 启动开发服务器
pnpm build        # 使用 Synthia CLI 构建项目
pnpm serve        # 使用 Synthia CLI 启动本地预览服务
```

### Webpack Demo（使用 Synthia CLI）

```bash
cd webpack-demo
pnpm install
pnpm dev          # 使用 Synthia CLI 启动开发服务器
pnpm build        # 使用 Synthia CLI 构建项目
pnpm serve        # 使用 Synthia CLI 启动本地预览服务
```

## Synthia CLI 命令

所有示例项目均集成了 Synthia CLI，对应脚本如下：

- `synthia dev`   - 启动开发服务器
- `synthia build` - 构建生产版本
- `synthia serve` - 启动本地预览（生产包）服务

## 传统命令

如果需要使用传统的构建工具命令，可以使用：

### Vite Demo（直接使用 Vite）

- `pnpm dev:vite`    - 直接使用 Vite 开发服务器
- `pnpm build:vite`  - 直接使用 Vite 构建
- `pnpm serve:vite`  - 直接使用 Vite 预览（vite preview）

### Webpack Demo（直接使用 Webpack）

- `pnpm dev:webpack`     - 直接使用 Webpack 开发服务器
- `pnpm build:webpack`   - 直接使用 Webpack 构建
- `pnpm preview:webpack` - 直接使用 Webpack 预览（生产模式）

## 特性

- 🚀 **统一 CLI**：同一套命令贯穿开发/构建/预览
- ⚡ **快速开发**：Vite 与 Webpack 均可获得一致体验
- 🛠️ **现代构建**：开箱即用的工程化与工具链
- 📦 **模块化结构**：清晰的目录与职责划分
- 🎨 **示例完备**：包含 Vue 3 与 React 18 的典型用例

## 先决条件

- 已安装 `pnpm`（推荐）
- Node.js 版本建议 ≥ 18
