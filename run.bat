@echo off
setlocal enabledelayedexpansion

echo ===============================================================================
echo                     LAUNCHING ALGOVISION PRO STUDIO
echo ===============================================================================
echo.

:: Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/ first.
    pause
    exit /b 1
)

echo [*] Starting Backend SQLite Express API on port 3001...
start "AlgoVision API Server (:3001)" cmd /k "npm run server"

echo [*] Starting Vite Frontend Server on port 5173...
start "AlgoVision Vite Dev (:5173)" cmd /k "npm run dev"

echo [*] Waiting for services to initialize...
timeout /t 3 /nobreak >nul

echo [*] Opening browser to http://localhost:5173/ ...
start http://localhost:5173/

echo.
echo ===============================================================================
echo  AlgoVision Pro is running!
echo  - Frontend Studio: http://localhost:5173/
echo  - Backend API:     http://localhost:3001/api/stats
echo.
echo  Default Demo Accounts:
echo    Username: krishna    | Password: password123
echo    Username: demo_coder | Password: password123
echo.
echo  To shut down, simply close the API and Vite server terminal windows.
echo ===============================================================================
echo.
pause
