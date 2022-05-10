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

# install what should be installed
npm i
npm i -D dotenv 

# set GH_TOKEN as environment variable
node scripts/export_gh_token.js

#done
echo ""
echo ""
echo ""
echo ""
echo "Success... Ready to deploy!"