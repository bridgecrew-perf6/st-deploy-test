## Bundle & deployment:

Choose the NPM script to bundle or deploy for your OS. E.g., `npm run deploy:mac`. 

> Bundling will skip publishing. 

- <span style="color:red">Make sure all projectes are at their intended branch for deployment</span>
- <span style="color:red">Make sure the version number in `starling-desktop/package.json` is correct</span>

### --Windows

To simplify Windows bundling and deployment, we assume that *up to native dependencies* everything has been compiled on either Mac or Linux. This happens automatically as a part of their respective bundle or deploy scripts. I.e., engine, flock and UI code. 

Part of deployment is a commit and push of these bundles to the git repository. On a Windows machine, these can be pulled. On the Windows machine, the bundling can then happen by choosing the script to bundle or deploy. 