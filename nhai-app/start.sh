#!/bin/bash
# NHAI System - Quick Start Script

echo "🚀 NHAI Offline Face Authentication System"
echo "==========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to project directory
cd nhai-app || { echo "❌ nhai-app directory not found"; exit 1; }

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully"
echo ""

# Start dev server
echo "🎬 Starting development server..."
echo ""
echo "📍 Application URL: http://localhost:5173"
echo "📍 Dashboard: http://localhost:5173/dashboard"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
