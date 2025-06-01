Clear-Host
Write-Host "[+] Updating system packages..." -ForegroundColor Green
Start-Sleep -Seconds 2
winget upgrade --all

Write-Host "[+] Installing dependencies..." -ForegroundColor Green
Start-Sleep -Seconds 2
winget install --id Git.Git -e --accept-source-agreements --accept-package-agreements
winget install --id OpenJS.NodeJS -e --accept-source-agreements --accept-package-agreements

Write-Host "[+] Cloning Hydrion-S3LFB0T repository..." -ForegroundColor Green
git clone https://github.com/Hydradevx/Hydrion-S3LFB0T.git
Set-Location Hydrion-S3LFB0T

Write-Host "[+] Installing Bun via official install script..." -ForegroundColor Green
Invoke-Expression (Invoke-RestMethod -Uri https://bun.sh/install.ps1)

$env:PATH = "$env:USERPROFILE\.bun\bin;$env:PATH"

Write-Host "[+] Installing project dependencies..." -ForegroundColor Green
bun install

Write-Host "[=] Installation complete! Starting Hydrion-S3LFB0T..." -ForegroundColor Cyan
bun start