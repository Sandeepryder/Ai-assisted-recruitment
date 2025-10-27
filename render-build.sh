#!/usr/bin/env bash
set -e

echo "⚙️ Installing dependencies..."
npm install

echo "🧩 Installing Prisma CLI and NestJS CLI globally..."
npm install -g prisma @nestjs/cli

echo "🧠 Generating Prisma client..."
npx prisma generate

echo "🚀 Building NestJS project..."
npm run build
