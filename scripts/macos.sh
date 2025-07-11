#!/usr/bin/env bash
set -e

RESET='\033[0m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
BOLD='\033[1m'

clear
echo -e "${GREEN}${BOLD}🍎 Hydrion Selfbot Installer — macOS${RESET}"
echo -e "${CYAN}Using Homebrew and PNPM${RESET}"
echo "────────────────────────────────────────────"
sleep 1

# Update and install
echo -e "${GREEN}[1/5] ${YELLOW}Updating brew packages...${RESET}"
brew update && brew upgrade

echo -e "${GREEN}[2/5] ${YELLOW}Installing Node.js, Git, Curl...${RESET}"
brew install git node curl

echo -e "${GREEN}[3/5] ${YELLOW}Installing pnpm...${RESET}"
npm i -g pnpm

echo -e "${GREEN}[4/5] ${YELLOW}Cloning Hydrion repo...${RESET}"
git clone https://github.com/Hydradevx/Hydrion-S3LFB0T.git
cd Hydrion-S3LFB0T

echo -e "${GREEN}[5/5] ${YELLOW}Installing dependencies...${RESET}"
pnpm install

# Create config.json
if [[ ! -f "config.json" ]]; then
  echo -e "${CYAN}⚙️  Creating default config.json...${RESET}"
  cat <<EOF > config.json
{
  "token": "your-token",
  "prefix": "!",
  "safetyTime": 30,
  "WebUI": false,
  "rpc": true
}
EOF
  echo -e "${GREEN}✅ config.json created! Replace 'your-token' manually.${RESET}"
fi

echo -e "\n${BOLD}${GREEN}✅ All done! Starting Hydrion...${RESET}"
pnpm start
