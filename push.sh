#!/bin/bash
# Usage: ./push.sh [branch]
set -e

BRANCH="${1:-main}"

echo "Pushing to origin/$BRANCH..."
git push origin "$BRANCH"
