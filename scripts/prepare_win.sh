#!/bin/sh

dir="$PWD"
echo "Preparing deployment environment"
echo ""
echo "######################################################"
echo "##                                                  ##"
echo "##  Make sure the following:                        ##"
echo "##                                                  ##"
echo "##   >  you've pulled the correct branch/commit     ##"
echo "##      from the engine                             ##"
echo "##   >  the main.js file reflects that state        ##"
echo "##                                                  ##"
echo "######################################################"
echo ""
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