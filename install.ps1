Clear-Host
Write-Host "[+] Updating system packages..." -ForegroundColor Green
Start-Sleep -Seconds 2
winget upgrade --all

Write-Host "[+] Installing dependencies..." -ForegroundColor Green
Start-Sleep -Seconds 2
winget install Git.NodeJS

Write-Host "[+] Cloning Hydrion-S3LFB0T repository..." -ForegroundColor Green
git clone https://github.com/Hydradevx/Hydrion-S3LFB0T.git
Set-Location Hydrion-S3LFB0T

Write-Host "[+] Installing Node.js dependencies..." -ForegroundColor Green
npm install -g bun
bun install

Write-Host "[=] Installation complete! Starting Hydrion-S3LFB0T..." -ForegroundColor Cyan
bun start