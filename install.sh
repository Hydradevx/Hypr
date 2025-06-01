#!/usr/bin/env bash

RESET='\033[0m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'

clear

echo -e "${GREEN}[+] ${BLUE}Updating system packages...${RESET}"
sleep 2

# Try apt update & upgrade, if it fails, try brew update & upgrade
if command -v apt >/dev/null 2>&1; then
  sudo apt update -y && sudo apt upgrade -y
elif command -v brew >/dev/null 2>&1; then
  brew update && brew upgrade
else
  echo -e "${YELLOW}[!] Neither apt nor brew found. Please update packages manually.${RESET}"
fi

echo -e "${GREEN}[+] ${BLUE}Installing dependencies...${RESET}"
sleep 2

if command -v apt >/dev/null 2>&1; then
  sudo apt install -y git nodejs npm curl
elif command -v brew >/dev/null 2>&1; then
  brew install git node node curl
else
  echo -e "${YELLOW}[!] Neither apt nor brew found. Please install dependencies manually.${RESET}"
fi

echo -e "${GREEN}[+] ${BLUE}Cloning Hydrion-S3LFB0T repository...${RESET}"
git clone https://github.com/Hydradevx/Hydrion-S3LFB0T.git || { echo "Failed to clone repo"; exit 1; }
cd Hydrion-S3LFB0T || { echo "Failed to enter repo directory"; exit 1; }

echo -e "${GREEN}[+] ${BLUE}Installing Bun via official script...${RESET}"
curl -fsSL https://bun.sh/install | bash || { echo "Bun install failed"; exit 1; }

export PATH="$HOME/.bun/bin:$PATH"

echo -e "${GREEN}[+] ${BLUE}Installing project dependencies...${RESET}"
bun install || { echo "bun install failed"; exit 1; }

echo -e "${GREEN}[=] Installation complete! Starting Hydrion-S3LFB0T...${RESET}"
bun start