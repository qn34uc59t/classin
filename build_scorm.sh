#!/bin/bash

echo "🚀 Building SCORM Package for ClassIn..."

# Build the project
echo "📦 Building React project..."
npm run build

# Create SCORM directory structure
echo "📁 Creating SCORM structure..."
mkdir -p scorm_package/assets

# Copy built files to SCORM package
echo "📋 Copying files..."
cp dist/index.html scorm_package/
cp -r dist/assets scorm_package/

# Copy SCORM API files
cp scorm_api.js scorm_package/assets/
cp imsmanifest.xml scorm_package/

# Create manifest.js for SCORM wrapper
cat > scorm_package/assets/manifest.js << 'EOF'
var scorm_version = "1.2";
EOF

# Create SCORM wrapper HTML that loads the React app
cat > scorm_package/index.html << 'EOF'
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Business English E-Learning</title>
    <script src="assets/scorm_api.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        #root {
            width: 100vw;
            height: 100vh;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="assets/index.js"></script>
</body>
</html>
EOF

# Rename the assets entry point
mv scorm_package/assets/index*.js scorm_package/assets/index.js 2>/dev/null || true

# Zip it up
echo "📦 Creating ZIP archive..."
cd scorm_package
zip -r ../business-english-module-scorm.zip .
cd ..

# Clean up
rm -rf scorm_package

echo ""
echo "✅ SCORM package created successfully!"
echo "📦 File: business-english-module-scorm.zip"
echo "📤 Upload this file to ClassIn Drive"
echo ""

