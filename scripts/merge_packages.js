const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require("path");

const desktop_package = JSON.parse(readFileSync(resolve("..", "starling-desktop", "package.json")));
const deploy_package = JSON.parse(readFileSync("package.json"));

// overwrite a couple of things:
deploy_package.dependencies = desktop_package.dependencies;
deploy_package.devDependencies = {
  "electron": desktop_package.devDependencies.electron,
  "electron-builder": desktop_package.devDependencies['electron-builder']
}
deploy_package.version = desktop_package.version;

// write to file
writeFileSync("package.json", JSON.stringify(deploy_package));