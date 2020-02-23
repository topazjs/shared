'use strict';

const path = require('path');

module.exports = [
    'source-map'
].map(devtool => ({
    'mode': process.env.NODE_ENV === `production` ? `production` : `development`,
    'entry': `./src/App.js`,
    'output': {
        'filename': `app.js`,
        'path': path.resolve(__dirname, `dist`),
        'library': `topazjs`,
    },
    devtool,
    'optimization': {
        'runtimeChunk': true
    },
    'module': {
        'rules': [
            {
                'test': /\.js$/,
                'exclude': /node_modules/,
                'use': {
                    'loader': `babel-loader`,
                }
            }
        ]
    }
}));
