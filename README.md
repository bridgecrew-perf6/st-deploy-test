## Bundle & deployment:

Choose the NPM script to bundle or deploy for your OS. E.g., `npm run deploy:mac`. 

> Bundling will skip publishing. 

- <span style="color:red">Make sure all projectes are at their intended branch for deployment</span>
- <span style="color:red">Make sure the version number in `starling-desktop/package.json` is correct</span>

### --Windows

Current no development is done on Windows.

To simplify Windows bundling and deployment, we assume that *up to native dependencies* everything has been compiled on either Mac or Linux. I.e., both engine (, flock), main and renderer code bundles. 

This happens automatically as a part of their respective bundle:[platform] or deploy:[platform] scripts. Up to engine (and flock), these bundles are part of the online repository, i.e. "dist", "main.js", "icon", ...

Part of deployment is a commit and push of these bundles to the git repository. On a Windows machine, these can be pulled. On the Windows machine, the bundling can then happen by choosing the script to bundle or deploy. 

##### Including engine

On a windows machine, we pull the code from the releases repo, and we pull from the private "starling-engine" repo. We do not need to compile the engine, since the JS bundle is included in the version control. 

When we bundle or deploy our production code on Windows, it will then look for this js bundle in starling-engine, and use that one to compile against the windows electron distribution. 

##### Preparing build environment

Preparing a Nodejs Windows development environment is notorious. There are a couple of resources available online which I found helpful:

- https://spin.atomicobject.com/2019/03/27/node-gyp-windows/
- https://github.com/nodejs/node-gyp
- https://github.com/microsoft/nodejs-guidelines/blob/master/windows-environment.md#command-line-console-and-other-useful-tools
- https://github.com/nodejs/node-gyp/issues/1486
- https://gist.github.com/jtrefry/fd0ea70a89e2c3b7779c
- https://github.com/nodejs/node-gyp/issues/629#issuecomment-225320227

Especially the Microsoft and Node Gyp documentations pointed in the right direction. 

However, ultimately, how it was set up was as follows;

1. Install powershell & git
2. Download Node 14.14 installer
3. In the wizard, make sure to tick the checkbox for installing the additional tools
4. This will launch the powershell and install python and vs build tools. 
    - Note that this can take very long. 
    - I ran into this problem too: https://www.reddit.com/r/chocolatey/comments/mv87qb/windows_powershell_stopped_during_installhow_do_i/
    - In the end I left, when I returned the powershell was gone at all. So I wasn't sure whether all was good
    - However, afterwards I as able to test install and usage of sqlite3@4.1.1 without problems
    - Angular electron quickstart @angular10 branch also installed and launched without problems
    - Rebuilding native dependencies against electron also worked + calling them in renderer