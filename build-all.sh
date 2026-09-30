#!/bin/bash
set -e

echo "Building group19-24..."
cd projects/group19-24
npm install
npm run build
cd ../..

echo "Building group50-55..."
cd projects/group50-55
npm install
npm run build
cd ../..

echo "Copying to dist..."
rm -rf dist
mkdir -p dist/group19-24
mkdir -p dist/group50-55

cp -R projects/group19-24/dist/* dist/group19-24/
cp -R projects/group50-55/dist/* dist/group50-55/

echo "Build complete!"
