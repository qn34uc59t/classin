#!/bin/bash

echo "🚀 Deploying to GitHub Pages..."

# Build the project
echo "📦 Building..."
npm run build

# Create deployment directory
rm -rf deploy
mkdir deploy
cp -r dist/* deploy/

# Create README for deployment
cat > deploy/README.md << 'EOF'
# Business English E-Learning

This directory contains the built application for GitHub Pages deployment.

EOF

echo "✅ Ready to deploy!"
echo "📤 Next: git add deploy/ && git commit && git push"

