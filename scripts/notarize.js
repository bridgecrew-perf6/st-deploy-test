require('dotenv').config();
//console.log(process.env)
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;  
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

    console.log("*** " + process.env.APPLEID)
    console.log("*** " + process.env.APPLEIDPASS)
    console.log("*** " + process.env.APPLE_TEAM_ID)

  return await notarize({
    appBundleId: 'com.yourcompany.yourAppId',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
    ascProvider:  process.env.APPLE_TEAM_ID
  });
};


// const fs = require('fs');
// const path = require('path');
// const electron_notarize = require('electron-notarize');

// module.exports = async function(params) {
//     console.log('electron-builder hook: afterSign');

//     if(params.packager.platform.buildConfigurationKey.includes('win')){
//         console.log('Skipping notarization because this build is for Windows...');
//         return;
//     }

//     // Same appId in electron-builder.
//     const appId = 'com.vkaivkaiv.apptest'; //'com.myApp.package';

//     const appPath = path.join(params.appOutDir, `${params.packager.appInfo.productFilename}.app`);
//     if (!fs.existsSync(appPath)) {
//         throw new Error(`Cannot find application at: ${appPath}`);
//     }

//     console.log(`Sending Apple the signed build, for them to notarize | ${appId} found at ${appPath}`);

//     try {
//         console.log("*** " + process.env.APPLEID)
//         console.log("*** " + process.env.APPLEIDPASS)

//         await electron_notarize.notarize({
//             appBundleId: appId,
//             appPath,
//             appleId: process.env.appleId,
//             appleIdPassword: process.env.appleIdPassword,
//         });
//         console.log('Received notarization ticket from Apple');
//         console.log('Stapled ticket to the App');
//     } catch (error) {
//         console.error(error);
//     }

//     console.log(`Done notarizing ${appId}`);
// };