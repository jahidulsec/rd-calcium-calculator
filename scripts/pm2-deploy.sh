#!/bin/bash
set -e

echo "1.Install Packages"
npm i

echo ""
echo "2. Build application build"
npm run build


echo ""
echo "3. Restart PM2 Process"
pm2 restart rd-calcium-calculator