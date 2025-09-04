#!/bin/bash

# Colors
GREEN="\033[0;32m"
BLUE="\033[0;34m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
RESET="\033[0m"

echo -e "${BLUE}🔍 Adding all changes...${RESET}"
git add .

echo -e "${BLUE}🔍 Displaying current changes ${RESET}"
git status

echo -ne "${YELLOW}💬 Enter commit message: ${RESET}"
read msg

if [ -z "$msg" ]; then
    echo -e "${RED}❌ Commit message cannot be empty!${RESET}"
    exit 1
fi

echo -e "${BLUE}📝 Committing changes...${RESET}"
git commit -m "$msg"

echo -e "${GREEN}🚀 Pushing to remote...${RESET}"
git push

echo -e "${GREEN}✅ Done!${RESET}"