#!/usr/bin/env bash
set -euo pipefail

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Install Node.js 18 or newer, then run this script again."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not installed. Install Node.js 18 or newer, then run this script again."
  exit 1
fi

if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
  echo "Add your OPENAI_API_KEY to .env before starting the server."
fi

npm install

echo ""
echo "Setup complete."
echo "Next steps:"
echo "1. Put your OPENAI_API_KEY in .env"
echo "2. Run: npm start"
echo "3. In the extension UI, save: http://localhost:3000/api/chat"
