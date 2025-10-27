#!/usr/bin/env bash
# Render build script

echo "⚙️ Installing dependencies..."
npm install

echo "🧩 Generating Prisma client..."
npx prisma generate

echo "🚀 Building NestJS project..."
npm run build
