#!/usr/bin/env bash

# Define color codes
RESET='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'

clear

echo -e "${GREEN}[+] ${BLUE}Updating Termux repositories...${RESET}"
sleep 2
echo "Press ENTER if prompted during the update."
apt update -y && apt upgrade -y
echo -e "${GREEN}[+] ${BLUE}Termux successfully updated.${RESET}"
echo -e "${GREEN}[+] ${BLUE}Installing required dependencies...${RESET}"
sleep 2
pkg install -y git nodejs
sleep 1
echo -e "${GREEN}[+] ${BLUE}All packages installed successfully.${RESET}"
echo -e "${GREEN}[+] ${BLUE}Cloning Hydrion-S3LFB0T repository...${RESET}"
git clone https://github.com/Hydradevx/Hydrion-S3LFB0T.git && cd Hydrion-S3LFB0T
echo -e "${GREEN}[+] ${BLUE}Installing Node.js dependencies...${RESET}"
npm install -g bun 
bun install
echo -e "${GREEN}[=] Installation complete! Starting Hydrion-S3LFB0T...${RESET}"
bun start