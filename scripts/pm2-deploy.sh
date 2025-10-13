#!/bin/bash
set -e

echo "1.Install Packages"
npm i

echo ""
echo "2. Generate DB"
npm run db:generate

echo ""
echo "3. Build application build"
npm run build


echo ""
echo "4. Restart PM2 Process"
pm2 restart rd-calcium-calculator