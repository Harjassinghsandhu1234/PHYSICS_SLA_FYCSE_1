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
mkdir -p dist

# Copy root assets for the landing page
cp index.html dist/index.html
cp -R thumbnails dist/thumbnails/

# Copy all static HTML projects
mkdir -p dist/projects
for dir in projects/*; do
  if [ "$dir" != "projects/group19-24" ] && [ "$dir" != "projects/group50-55" ]; then
    cp -R "$dir" dist/projects/
  fi
done

# Copy built Vite apps
mkdir -p dist/group19-24
mkdir -p dist/group50-55
cp -R projects/group19-24/dist/* dist/group19-24/
cp -R projects/group50-55/dist/* dist/group50-55/

echo "Build complete!"
