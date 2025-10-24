# 多阶段构建 Dockerfile for Next.js
# Stage 1: 依赖安装
FROM node:20-alpine AS deps

# 安装必要的系统依赖
RUN apk add --no-cache libc6-compat

# 设置工作目录
WORKDIR /app

# 复制依赖配置文件
COPY package.json package-lock.json* ./

# 安装生产依赖
RUN npm ci --omit=dev

# Stage 2: 构建阶段
FROM node:20-alpine AS builder

# 安装必要的系统依赖
RUN apk add --no-cache libc6-compat

WORKDIR /app

# 复制依赖配置并安装所有依赖（包括 devDependencies）
COPY package.json package-lock.json* ./
RUN npm ci

# 复制源代码
COPY . .

# 设置环境变量
ENV NEXT_TELEMETRY_DISABLED=1

# 构建应用
RUN npm run build

# Stage 3: 生产运行
FROM node:20-alpine AS runner

WORKDIR /app

# 设置环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制必要文件
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 设置文件权限
RUN chown -R nextjs:nodejs /app

# 切换到非 root 用户
USER nextjs

# 暴露端口
EXPOSE 3000

# 设置端口环境变量
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 启动应用
CMD ["node", "server.js"]
