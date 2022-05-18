require('dotenv').config();
const { execSync } = require('child_process');

/**
 * Set GH_TOKEN in your .env file
 */
const GH_TOKEN = process.env.GH_TOKEN;
if (process.platform === 'win32') {
  execSync(`setx GH_TOKEN ${GH_TOKEN}`);
} else {
  execSync(`export GH_TOKEN=${GH_TOKEN}`);
}