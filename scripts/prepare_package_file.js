const { readFileSync, writeFileSync, createReadStream } = require('fs');
const { resolve } = require("path");
const readline = require('readline');

// execute:
readGitConfig(mergePackages);


/**
 * Reads the repo url from the Git config
 */
function readGitConfig(cb) {
  const config = readline.createInterface({
    input: createReadStream('.git/config'),
    terminal: false
  });

  config.on('line', line => {
    const idx = line.indexOf("https://")
    if (!line.match(/^\s*url/) || idx < 0) return;
    const GIT_URL = line.slice(idx).trim();
    config.close();
    cb(GIT_URL);
  })
}

/**
 * Merge the local package requirements with those of the desktop app
 * @param {*} GIT_URL 
 */
function mergePackages(GIT_URL) {
  // Read the desktop software package 
  const desktop_package = JSON.parse(readFileSync(resolve("..", "starling-desktop", "package.json")));
  const deploy_package = {
    "private": false,
    "scripts": {
      "prebundle:linux": "sh scripts/prepare.sh",
      "prebundle:windows": "sh scripts/prepare.sh",
      "prebundle:mac": "sh scripts/prepare.sh",
      "predeploy:linux": "sh scripts/prepare.sh",
      "predeploy:windows": "sh scripts/prepare.sh",
      "predeploy:mac": "sh scripts/prepare.sh",
      "bundle:linux": "electron-builder build --linux -p=never",
      "bundle:windows": "electron-builder build --windows -p=never",
      "bundle:mac": "electron-builder build --mac -p=never",
      "deploy:linux": "electron-builder build --linux -p=always",
      "deploy:windows": "electron-builder build --windows -p=always",
      "deploy:mac": "electron-builder build --mac -p=always"
    },
    "license": "UNLICENSED",
    "repository": {
      "type": "git",
      "url": GIT_URL
    }
  };

  // Prepare a confirmation interaction for the release version
  const confirmation = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  confirmation.question(`App version: v${desktop_package.version}. Is this correct?\n(Enter to continue, Ctrl-C to abort)\n`, function (x) {
    confirmation.close();
    console.log("Ok! Continuing...");

    // overwrite a couple of things:
    deploy_package.name = desktop_package.name;
    deploy_package.version = desktop_package.version;
    deploy_package.description = desktop_package.description;
    deploy_package.keywords = desktop_package.keywords;
    deploy_package.author = desktop_package.author;
    deploy_package.contributors = desktop_package.contributors;
    deploy_package.main = desktop_package.main;
    deploy_package.dependencies = desktop_package.dependencies;
    deploy_package.devDependencies = {
      "electron": desktop_package.devDependencies.electron,
      "electron-builder": desktop_package.devDependencies['electron-builder'],
      "bytenode": desktop_package.devDependencies.bytenode,
    }

    // write to file
    writeFileSync("package.json", JSON.stringify(deploy_package));
    console.log("done.")
    process.exit(0);
  });
}

