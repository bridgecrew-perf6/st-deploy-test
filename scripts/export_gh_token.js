require('dotenv').config();
const { execSync } = require('child_process');

/**
 * Set GH_TOKEN in your .env file
 */
const GH_TOKEN = process.env.GH_TOKEN;
execSync(`export GH_TOKEN=${GH_TOKEN}`);