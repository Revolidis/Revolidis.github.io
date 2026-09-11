#!/bin/bash
# Usage: ./setup.sh git@github.com:username/repo.git
set -e

REMOTE_URL="$1"

if [ -z "$REMOTE_URL" ]; then
  echo "Usage: ./setup.sh git@github.com:username/repo.git"
  exit 1
fi

if [ ! -d .git ]; then
  git init
  echo "Initialized new git repo."
fi

if git remote | grep -q origin; then
  git remote set-url origin "$REMOTE_URL"
  echo "Updated origin to $REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
  echo "Added origin: $REMOTE_URL"
fi
