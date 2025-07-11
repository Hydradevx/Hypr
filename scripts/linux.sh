#!/usr/bin/env bash
set -e

RESET='\033[0m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
BOLD='\033[1m'

clear
echo -e "${GREEN}${BOLD}🐧 Hydrion Selfbot Installer — Linux${RESET}"
echo -e "${CYAN}Auto-detects distro and uses PNPM${RESET}"
echo "────────────────────────────────────────────"
sleep 1

# Detect and install packages
if command -v apt >/dev/null 2>&1; then
  echo -e "${GREEN}[1/5] ${YELLOW}Updating apt...${RESET}"
  sudo apt update -y && sudo apt upgrade -y
  echo -e "${GREEN}[2/5] ${YELLOW}Installing dependencies...${RESET}"
  sudo apt install -y git nodejs npm curl
elif command -v dnf >/dev/null 2>&1; then
  echo -e "${GREEN}[1/5] ${YELLOW}Updating dnf...${RESET}"
  sudo dnf update -y
  echo -e "${GREEN}[2/5] ${YELLOW}Installing dependencies...${RESET}"
  sudo dnf install -y git nodejs npm curl
elif command -v pacman >/dev/null 2>&1; then
  echo -e "${GREEN}[1/5] ${YELLOW}Updating pacman...${RESET}"
  sudo pacman -Syu --noconfirm
  echo -e "${GREEN}[2/5] ${YELLOW}Installing dependencies...${RESET}"
  sudo pacman -S --noconfirm git nodejs npm curl
else
  echo -e "${YELLOW}⚠️  Unsupported distro. Please install git, nodejs, and curl manually.${RESET}"
  exit 1
fi

echo -e "${GREEN}[3/5] ${YELLOW}Installing pnpm globally...${RESET}"
npm i -g pnpm

echo -e "${GREEN}[4/5] ${YELLOW}Cloning Hydrion repo...${RESET}"
git clone https://github.com/Hydradevx/Hydrion-S3LFB0T.git
cd Hydrion-S3LFB0T

echo -e "${GREEN}[5/5] ${YELLOW}Installing dependencies via pnpm...${RESET}"
pnpm install

# config.json
if [[ ! -f "config.json" ]]; then
  echo -e "${CYAN}⚙️  Creating config.json...${RESET}"
  cat <<EOF > config.json
{
  "token": "your-token",
  "prefix": "!",
  "safetyTime": 30,
  "WebUI": false,
  "rpc": true
}
EOF
  echo -e "${GREEN}✅ config.json created. Please add your token.${RESET}"
fi

echo -e "\n${BOLD}${GREEN}✅ Setup complete. Launching Hydrion...${RESET}"
pnpm start