Clear-Host

$green = "Green"
$cyan = "Cyan"
$yellow = "Yellow"
$red = "Red"

Write-Host "🚀 Hydrion Selfbot Installer — Windows (PowerShell)" -ForegroundColor $green
Write-Host "────────────────────────────────────────────`n"

# 1. System Update
Write-Host "[1/6] Updating packages via winget..." -ForegroundColor $cyan
Start-Sleep -Seconds 2
winget upgrade --all

# 2. Dependencies
Write-Host "`n[2/6] Installing Git and Node.js..." -ForegroundColor $cyan
Start-Sleep -Seconds 2
winget install --id Git.Git -e --accept-source-agreements --accept-package-agreements
winget install --id OpenJS.NodeJS -e --accept-source-agreements --accept-package-agreements

# 3. Install pnpm
Write-Host "`n[3/6] Installing pnpm globally..." -ForegroundColor $cyan
npm install -g pnpm

# 4. Clone repo
Write-Host "`n[4/6] Cloning Hydrion-S3LFB0T..." -ForegroundColor $cyan
git clone https://github.com/Hydradevx/Hydrion-S3LFB0T.git
Set-Location Hydrion-S3LFB0T

# 5. Install dependencies
Write-Host "`n[5/6] Installing dependencies via pnpm..." -ForegroundColor $cyan
pnpm install

# 6. Create config.json
Write-Host "`n[6/6] Checking for config.json..." -ForegroundColor $cyan
if (-Not (Test-Path "config.json")) {
    Write-Host "⚙️  Creating default config.json..." -ForegroundColor $yellow
    @"
{
  "token": "your-token",
  "prefix": "!",
  "safetyTime": 30,
  "WebUI": false,
  "rpc": true
}
"@ | Out-File -Encoding utf8 -FilePath config.json
    Write-Host "✅ config.json created. Please update your token before use." -ForegroundColor $green
} else {
    Write-Host "✅ config.json already exists." -ForegroundColor $green
}

# Final
Write-Host "`n🎉 Setup complete! Launching Hydrion..." -ForegroundColor $green
Start-Sleep -Seconds 1
pnpm start