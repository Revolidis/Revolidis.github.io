#!/bin/bash
# Usage: ./pull.sh [branch]
set -e

BRANCH="${1:-main}"

echo "Pulling latest changes from origin/$BRANCH..."
git pull origin "$BRANCH"
