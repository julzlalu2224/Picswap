#!/bin/bash

# PicSwap - Quick Start Script
# This script sets up and runs the image converter locally

echo "🖼️  PicSwap - Image Converter Setup"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -f "Picswap.Client.csproj" ]; then
    echo "❌ Error: Please run this script from the Picswap.Client directory"
    echo "   cd Picswap.Client && ./start.sh"
    exit 1
fi

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first:"
    echo "   https://nodejs.org/"
    exit 1
fi

# Check for .NET
if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET SDK is not installed. Please install .NET 8 SDK first:"
    echo "   https://dotnet.microsoft.com/download/dotnet/8.0"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

echo ""
echo "🎨 Building Tailwind CSS..."
npm run build:css

if [ $? -ne 0 ]; then
    echo "❌ CSS build failed"
    exit 1
fi

echo ""
echo "🔨 Building Blazor project..."
dotnet build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "🚀 Starting development server..."
echo "   The app will open at: https://localhost:5001"
echo "   Press Ctrl+C to stop the server"
echo ""

dotnet run
