#!/usr/bin/env bash

# Define colors
RESET='\033[0m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'

clear

echo -e "${GREEN}[+] ${BLUE}Updating system packages...${RESET}"
sleep 2
sudo apt update -y && sudo apt upgrade -y || sudo brew update && sudo brew upgrade
echo -e "${GREEN}[+] ${BLUE}Installing dependencies...${RESET}"
sleep 2
sudo apt install -y git nodejs npm || brew install git nodejs
echo -e "${GREEN}[+] ${BLUE}Cloning Hydrion-S3LFB0T repository...${RESET}"
git clone https://github.com/Hydradevx/Hydrion-S3LFB0T.git && cd Hydrion-S3LFB0T
echo -e "${GREEN}[+] ${BLUE}Installing Node.js dependencies...${RESET}"
npm install -g bun
bun install
bun run build
echo -e "${GREEN}[=] Installation complete! Starting Hydrion-S3LFB0T...${RESET}"
bun start
