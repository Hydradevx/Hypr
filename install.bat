@echo off
cls
echo [+] Updating system packages...
timeout /t 2
winget upgrade --all
echo [+] Installing dependencies...
timeout /t 2
winget install Git.NodeJS
echo [+] Cloning Hydrion-S3LFB0T repository...
git clone https://github.com/Hydradevx/Hydrion-S3LFB0T.git
cd Hydrion-S3LFB0T
echo [+] Installing Node.js dependencies...
npm install -g bun
echo [=] Installation complete! Starting Hydrion-S3LFB0T...
bun install
bun run build
bun start
pause