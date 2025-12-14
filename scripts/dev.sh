#!/bin/bash

# Development startup script for Acquisition App with Neon Local
# This script starts the application in development mode with Neon Local

echo "Starting Acquisition App in Development Mode"

# Check if .env.development exists
if [ ! -f .env.development ]; then
    echo "Error: .env.development file not found"
    exit 1
fi

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "Error: Docker is not running"
    exit 1
fi

# Create .neon_local directory if it doesn't exist
mkdir -p .neon_local

# Add .neon_local to .gitignore
if ! grep -q ".neon_local/" .gitignore 2>/dev/null; then
    echo ".neon_local/" >> .gitignore
    echo "Added .neon_local/ to .gitignore"
fi

echo "Building and starting development containers"
echo ""

# Start Development Environment (this needs to happen first)
docker compose -f docker-compose.dev.yml up -d --build

echo "Waiting for the database to be ready..."
sleep 5
docker compose -f docker-compose.dev.yml exec neon-local pg_isready -U neon

# Run migrations with Drizzle
echo "Applying latest schema with Drizzle"
npm run db:migrate

echo ""
echo "Development environment started"
echo "Listening on http://localhost:3000"
echo "Database: postgres://neon:npg@localhost:5432/neondb"
echo "To stop the environment, press Ctrl+C or run: docker compose -f docker-compose.dev.yml down"
