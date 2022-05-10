const { downloadArtifact } = require("@electron/get");
const { readFileSync, mkdirSync, copyFileSync, writeFileSync, existsSync } = require("fs");
const { resolve, dirname } = require('path');
const { arch } = require('os');
const { execSync, fork } = require('child_process');
const extract = require('extract-zip');



/**
 * OK, this seems all a lot of work for compiling the engine, but better to make absolutely sure that we compile the engine against the electron distro which we will ship with
 * @param {*} context
 */
exports.default = async function (context) {
  const framework = context.packager.info._framework;
  const platform = context.packager.platform;

  const opts = {
    artifactName: framework.name,
    version: framework.version,
    arch: arch(),
    platform: platform.name,
    cacheRoot: '.cache',
  };
  console.log("> Compiling engine for", opts);

  console.log("> Downloading...")
  const path = await downloadArtifact(opts);

  // we need the zip also at the root, that's where electron-builder looks
  if (process.platform !== 'win32') {
    execSync(`cp ${path} ${resolve(dirname(path), "..")}`);
  } else {
    execSync(`Copy-Item '${path}' -Destination '${resolve(dirname(path), "..")}'`);
  }

  // next we install electron locally
  // we need bytenode too because it will look locally for electron...
  execSync(`npm i electron@${framework.version} bytenode --prefix .cache`);

  // next we need to overwrite the actual distro
  target = resolve(".cache/node_modules/electron/dist");
  if (process.platform !== 'win32') {
    execSync(`rm -rf ${target}`);
  } else {
    execSync(`Remove-Item '${target}' -Recurse`);
  }
  console.log("> extracting distro");
  mkdirSync(target);
  await extract(path, { dir: target });

  // ok, we made the dist folder,
  // now we need to compile the engine
  console.log("> compiling...")
  if (process.platform !== 'win32') {
    execSync(`./.cache/node_modules/.bin/bytenode -c -e ../starling-desktop/engine/main.js`);
  } else {
    // if we're on windows just get the js from the engine repo
    execSync(`./.cache/node_modules/.bin/bytenode -c -e ../starling-engine/bundle/main.js`);
    source = resolve("../starling-engine/bundle");
    target = resolve("engine");
    execSync(`Copy-Item '${path}' -Destination '${target}'`);
  }
  console.log("> done")
}

