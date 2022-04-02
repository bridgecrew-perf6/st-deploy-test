#!/bin/sh

dir="$PWD"
echo "Preparing deployment environment"
echo ""
echo "######################################################"
echo "##                                                  ##"
echo "##  Make sure the following:                        ##"
echo "##                                                  ##"
echo "##   >  you're on the right git branch for          ##"
echo "##      each module part of this deployment         ##"
echo "##   >  you've set the correct version in           ##"
echo "##      starling-desktop/package.json               ##"
echo "##                                                  ##"
echo "######################################################"
echo ""
echo "After this script succeeds"
printf "%s " "Any key to continue, Ctrl-C to abort..."
read ans
rm -rf dist engine icon node_modules package-lock.json
cd ../starling-desktop
sh update_engine.sh
npm run build:prod
cp -r dist engine icon main.js electron-builder.json $dir
cd $dir
node scripts/merge_packages.js
npm i
echo ""
echo ""
echo ""
echo ""
echo "Success... Ready to deploy!"