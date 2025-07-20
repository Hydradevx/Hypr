@echo off
cls
color 0A
title Hypr Installer (Windows Batch)

echo --------------------------------------------------
echo      🚀 Hypr Installer - Windows
echo --------------------------------------------------
echo.

:: 1. Update system
echo [1/6] Updating system packages...
timeout /t 2 >nul
winget upgrade --all

:: 2. Install dependencies
echo.
echo [2/6] Installing Git and Node.js...
timeout /t 2 >nul
winget install --id Git.Git -e --accept-source-agreements --accept-package-agreements
winget install --id OpenJS.NodeJS -e --accept-source-agreements --accept-package-agreements

:: 3. Install pnpm
echo.
echo [3/6] Installing pnpm globally...
npm install -g pnpm

:: 4. Clone repo
echo.
echo [4/6] Cloning Hypr repository...
git clone https://github.com/Hydradevx/Hypr.git
cd Hypr

:: 5. Install dependencies
echo.
echo [5/6] Installing project dependencies...
pnpm install

:: 6. Create config.json if not exists
if not exist config.json (
  echo.
  echo [6/6] Creating default config.json...
  echo {> config.json
  echo   "token": "your-token",>> config.json
  echo   "prefix": "!",>> config.json
  echo   "safetyTime": 30,>> config.json
  echo   "WebUI": false,>> config.json
  echo   "rpc": true>> config.json
  echo }>> config.json
  echo [✓] config.json created. Please replace your-token manually.
) else (
  echo [✓] config.json already exists.
)

:: Done
echo.
echo [=] Installation complete! Starting Hypr...
pnpm start

pause