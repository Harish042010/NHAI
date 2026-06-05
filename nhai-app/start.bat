@echo off
REM NHAI System - Quick Start Script for Windows

echo.
echo 🚀 NHAI Offline Face Authentication System
echo ===========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm version: %NPM_VERSION%
echo.

REM Navigate to project directory
cd /d nhai-app
if %errorlevel% neq 0 (
    echo ❌ nhai-app directory not found
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully
echo.

REM Start dev server
echo 🎬 Starting development server...
echo.
echo 📍 Application URL: http://localhost:5173
echo 📍 Dashboard: http://localhost:5173/dashboard
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
pause
