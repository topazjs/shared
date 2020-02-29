'use strict';

const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    'appAssets': resolveApp("assets"), // For images and other assets
    'appBuild': resolveApp("dist"), // Prod built files end up here
    'appConfig': resolveApp("config"), // App config files
    'appHtml': resolveApp("src/index.html"),
    'appIndexJs': resolveApp("src/App.js"), // Main entry point
    'appSrc': resolveApp("src") // App source
};
