#!/usr/bin/env bash

RESET='\033[0m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'

clear

echo -e "${GREEN}[+] ${BLUE}Updating Termux repositories...${RESET}"
sleep 2
echo "Press ENTER if prompted during the update."
apt update -y && apt upgrade -y

echo -e "${GREEN}[+] ${BLUE}Installing required dependencies...${RESET}"
sleep 2
pkg install -y git nodejs curl

echo -e "${GREEN}[+] ${BLUE}Cloning Hydrion-S3LFB0T repository...${RESET}"
git clone https://github.com/Hydradevx/Hydrion-S3LFB0T.git || { echo "Repo clone failed"; exit 1; }
cd Hydrion-S3LFB0T || { echo "Failed to enter repo directory"; exit 1; }

echo -e "${GREEN}[+] ${BLUE}Installing Bun via official script...${RESET}"
curl -fsSL https://bun.sh/install | bash || { echo "Bun install failed"; exit 1; }

export PATH="$HOME/.bun/bin:$PATH"

echo -e "${GREEN}[+] ${BLUE}Installing project dependencies...${RESET}"
bun install || { echo "bun install failed"; exit 1; }

echo -e "${GREEN}[=] Starting Hydrion-S3LFB0T...${RESET}"
bun start