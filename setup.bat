@echo off
setlocal enabledelayedexpansion

echo ===============================================================================
echo                ALGOVISION PRO - ONE-CLICK ENVIRONMENT SETUP
echo ===============================================================================
echo.

:: Step 1: Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js (v18 or higher recommended) from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [*] Detected Node.js: %NODE_VERSION%
echo.

:: Step 2: Install Dependencies
echo [*] Installing frontend and backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install npm dependencies!
    pause
    exit /b 1
)
echo [OK] Dependencies installed successfully.
echo.

:: Step 3: Seed / Sync SQLite Database with 369 Striver Problems & Users
echo [*] Initializing SQLite database (data/algovision.sqlite)...
node server/import-strivers.js
if %errorlevel% neq 0 (
    echo [ERROR] Failed to import DSA sheet into SQLite!
    pause
    exit /b 1
)
echo [OK] Striver's A2Z Sheet imported with unique IDs (Q-001 to Q-369) and seeded demo users.
echo.

:: Step 4: Verify Frontend Build
echo [*] Validating frontend build (Vite + React)...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Frontend build failed!
    pause
    exit /b 1
)
echo [OK] Production build verified successfully.
echo.

echo ===============================================================================
echo [SUCCESS] AlgoVision Pro is fully configured and ready!
echo.
echo Quick Start:
echo   Run "run.bat" to start both the Express API and Vite Dev Server!
echo ===============================================================================
echo.
pause
