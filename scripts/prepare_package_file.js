const { readFileSync, writeFileSync, createReadStream } = require('fs');
const { resolve } = require("path");
const readline = require('readline');


const desktop_package = JSON.parse(readFileSync(resolve("..", "starling-desktop", "package.json")));
const deploy_package = JSON.parse(readFileSync("package.json"));
const confirmation = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const envFile = readline.createInterface({
  input: createReadStream('.env'),
  terminal: false
});

envFile.on('line', line => {
  if (!line.startsWith("GIT_URL")) return;
  const GIT_URL = line.split("=")[1];
  envFile.close();

  confirmation.question(`App version: v${desktop_package.version}. Is this correct?\n(Enter to continue, Ctrl-C to abort)\n`, function (x) {
    console.log("Ok! Continuing...");

    // overwrite a couple of things:
    deploy_package.dependencies = desktop_package.dependencies;
    deploy_package.name = desktop_package.name;
    deploy_package.author = deploy_package.author;
    deploy_package.contributors = deploy_package.contributors;
    deploy_package.devDependencies = {
      "electron": desktop_package.devDependencies.electron,
      "electron-builder": desktop_package.devDependencies['electron-builder']
    }
    deploy_package.version = desktop_package.version;
    deploy_package.repository = {
      "type": "git",
      "url": GIT_URL
    };

    // write to file
    writeFileSync("package.json", JSON.stringify(deploy_package));

    confirmation.close();
  });
})


