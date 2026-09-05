# frontend-engineering-system

这是一个从空目录开始搭建的前端工程管理实践项目。

本项目会逐步覆盖：

- Monorepo 工程结构
- 包管理与依赖治理
- 应用架构与公共包沉淀
- 代码规范、测试体系与 CI 质量门禁
- 自动化部署与上线后治理
- 工程模板、脚手架与团队规范

## 环境要求

- Node.js >= 22.0.0
- pnpm 11.x

本项目通过 `packageManager` 固定包管理器版本，并通过 `pnpm-workspace.yaml` 管理 Monorepo 工作区。

## 安装依赖

```bash
corepack enable
pnpm install
```

## 常用命令

```bash
pnpm dev
pnpm build
pnpm preview
```

- `pnpm dev`：从根目录启动 `apps/web` 开发服务器。
- `pnpm build`：构建 `apps/web`。
- `pnpm preview`：本地预览 `apps/web` 构建产物。
