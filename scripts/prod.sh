#!/bin/bash

# Development startup script for Acquisition App using Remote Neon DB

echo "Starting Acquisition App in Development Mode (Remote Neon)"

# Check if .env.development exists
if [ ! -f .env.development ]; then
    echo "Error: .env.development file not found"
    exit 1
fi

# Load environment variables (including your Neon DATABASE_URL)
export $(grep -v '^#' .env.development | xargs)

# Validate Neon connection string exists
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL is not set in .env.development"
    exit 1
fi

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "Error: Docker is not running"
    exit 1
fi

echo "Building and starting development containers"
echo ""

# Start services (no local DB this time)
docker compose -f docker-compose.dev.yml up -d --build

echo "Running database migrations on Remote Neon..."
npm run db:migrate

echo ""
echo "Development environment started"
echo "Application: http://localhost:5173"
echo "Remote Database: $DATABASE_URL"
echo "To stop the environment, press Ctrl+C or run: docker compose -f docker-compose.dev.yml down"
