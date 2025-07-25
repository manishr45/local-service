#!/bin/bash

# Tiffin Management System - Setup Script
echo "🍱 Setting up Tiffin Management System..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js (v16 or higher) first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | sed 's/v//')
REQUIRED_VERSION="16.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    print_error "Node.js version $NODE_VERSION is too old. Please install Node.js v16 or higher."
    exit 1
fi

print_status "Node.js version $NODE_VERSION is compatible"

# Check if MongoDB is running (optional)
if command -v mongod &> /dev/null; then
    if pgrep -x "mongod" > /dev/null; then
        print_status "MongoDB is running"
    else
        print_warning "MongoDB is installed but not running. You may need to start it manually."
    fi
else
    print_warning "MongoDB not found locally. Make sure you have MongoDB Atlas or local MongoDB setup."
fi

# Install root dependencies
print_info "Installing root dependencies..."
if npm install; then
    print_status "Root dependencies installed"
else
    print_error "Failed to install root dependencies"
    exit 1
fi

# Install server dependencies
print_info "Installing server dependencies..."
cd server
if npm install; then
    print_status "Server dependencies installed"
else
    print_error "Failed to install server dependencies"
    exit 1
fi
cd ..

# Install client dependencies
print_info "Installing client dependencies..."
cd client
if npm install; then
    print_status "Client dependencies installed"
else
    print_error "Failed to install client dependencies"
    exit 1
fi
cd ..

# Create environment file if it doesn't exist
if [ ! -f "server/.env" ]; then
    print_info "Creating environment file..."
    cp server/.env.example server/.env
    print_status "Environment file created at server/.env"
    print_warning "Please edit server/.env and add your configuration values"
else
    print_info "Environment file already exists"
fi

# Create basic directories that might be needed
mkdir -p server/uploads
mkdir -p server/logs
print_status "Created necessary directories"

# Initialize Tailwind CSS (if not already done)
cd client
if [ ! -f "postcss.config.js" ]; then
    print_info "Setting up Tailwind CSS..."
    cat > postcss.config.js << EOF
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF
    print_status "PostCSS configuration created"
fi
cd ..

# Create a basic .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    print_info "Creating .gitignore file..."
    cat > .gitignore << EOF
# Dependencies
node_modules/
*/node_modules/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Build outputs
build/
dist/
.next/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Uploads
server/uploads/*
!server/uploads/.gitkeep

# Temporary files
*.tmp
*.temp
EOF
    print_status ".gitignore file created"
fi

# Create upload directory placeholder
touch server/uploads/.gitkeep

print_status "Setup completed successfully!"
echo ""
print_info "Next steps:"
echo "1. Edit server/.env with your configuration"
echo "2. Start MongoDB (if using local instance)"
echo "3. Run 'npm run dev' to start both server and client"
echo ""
print_info "Available commands:"
echo "• npm run dev        - Start both server and client in development mode"
echo "• npm run server     - Start only the server"
echo "• npm run client     - Start only the client"
echo "• npm run build      - Build the client for production"
echo ""
print_status "Happy coding! 🚀"