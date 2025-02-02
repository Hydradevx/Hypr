# Display message
Write-Host "You Must have Git and NodeJS installed to run this script"

# Clone the repository
Write-Host "Cloning the repository..."
git clone https://github.com/Hydradevx/Hydrion-S3LFB0T.git

# Change directory
Set-Location -Path "Hydrion-S3LFB0T"


# Run the update script after setup (calling update.ps1)
Write-Host "Installing Node.js dependencies..."
& ".\install.ps1"
