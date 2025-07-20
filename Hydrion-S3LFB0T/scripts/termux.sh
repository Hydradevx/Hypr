#!/usr/bin/env bash
set -e

# Colors
RESET='\033[0m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
BOLD='\033[1m'

clear
echo -e "${GREEN}${BOLD}🚀 Hydrion Selfbot — Termux Installer${RESET}"
echo -e "${CYAN}For Android via Termux | PNPM version${RESET}"
echo "────────────────────────────────────────────"
sleep 1

# Update
echo -e "${GREEN}[1/6] ${YELLOW}Updating Termux packages...${RESET}"
pkg update -y && pkg upgrade -y

# Install deps
echo -e "${GREEN}[2/6] ${YELLOW}Installing Git, Node.js, and curl...${RESET}"
pkg install -y git nodejs curl

# Install pnpm
echo -e "${GREEN}[3/6] ${YELLOW}Installing pnpm globally...${RESET}"
npm i -g pnpm

# Clone repo
echo -e "${GREEN}[4/6] ${YELLOW}Cloning Hydrion-S3LFB0T repository...${RESET}"
git clone https://github.com/Hydradevx/Hydrion-S3LFB0T.git
cd Hydrion-S3LFB0T

# Install dependencies
echo -e "${GREEN}[5/6] ${YELLOW}Installing dependencies via pnpm...${RESET}"
pnpm install

# Config.json setup
echo -e "${GREEN}[6/6] ${YELLOW}Checking for config.json...${RESET}"
if [[ ! -f "config.json" ]]; then
  echo -e "${CYAN}⚙️  config.json not found. Creating a default one...${RESET}"
  sleep 1
  cat <<EOF > config.json
{
  "token": "your-token",
  "prefix": "!",
  "safetyTime": 30,
  "WebUI": false,
  "rpc": true
}
EOF
  echo -e "${GREEN}✅ config.json created! Remember to replace 'your-token'.${RESET}"
else
  echo -e "${GREEN}✅ config.json already exists.${RESET}"
fi

# Finish
echo -e "\n${BOLD}${GREEN}🎉 All done! Starting Hydrion-S3LFB0T...${RESET}"
sleep 1
pnpm start