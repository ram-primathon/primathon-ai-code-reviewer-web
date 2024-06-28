#!/bin/bash

# Function to handle errors
handle_error() {
    echo "Error on line $1"
    exit 1
}

# Trap errors and call handle_error function
trap 'handle_error $LINENO' ERR

# Ensure nvm is loaded
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" || { echo "Failed to load nvm"; exit 1; }

# Switch to Node.js version 20
echo "Switching to Node.js version 20..."
nvm use 20 || { echo "Failed to switch Node.js version"; exit 1; }

# Install dependencies with Pnpm
echo "Installing dependencies..."
pnpm install || { echo "Failed to install dependencies"; exit 1; }

# Start the application using PM2
echo "Starting the application with PM2..."
pm2 start pnpm --name "AI-Code-Reviewer-Web" -- start || { echo "Failed to start application with PM2"; exit 1; }

echo "Application started successfully!"
