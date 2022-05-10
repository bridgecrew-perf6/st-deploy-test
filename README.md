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