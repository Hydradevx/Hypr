@echo off
cls
echo [+] Updating system packages...
timeout /t 2
winget upgrade --all

echo [+] Installing dependencies...
timeout /t 2
winget install Git.Git
winget install OpenJS.NodeJS

echo [+] Cloning Hydrion-S3LFB0T repository...
git clone https://github.com/Hydradevx/Hydrion-S3LFB0T.git
cd Hydrion-S3LFB0T

echo [+] Installing Bun via official install script...
powershell -Command "Invoke-WebRequest -Uri https://bun.sh/install.ps1 -OutFile install.ps1; .\install.ps1; Remove-Item install.ps1"

:: Add Bun to PATH for this session
set PATH=%USERPROFILE%\.bun\bin;%PATH%

echo [+] Installing project dependencies...
bun install

echo [=] Installation complete! Starting Hydrion-S3LFB0T...
bun start
pause