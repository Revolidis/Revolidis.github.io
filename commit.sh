#!/bin/bash
# Usage: ./commit.sh "your commit message"
set -e

MESSAGE="${1:-update}"

git add .

if git diff --cached --quiet; then
  echo "Nothing to commit."
else
  git commit -m "$MESSAGE"
fi
