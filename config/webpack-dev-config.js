'use strict';

const path = require("path");
const paths = require("./paths");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack-common-config.js");

module.exports = [
    'source-map'
].map(devtool => merge(common, {
    entry: [ paths.appIndexJs ],
    mode: "development",
    // devtool option controls if and how source maps are generated.
    // see https://webpack.js.org/configuration/devtool/
    // If you find that you need more control of source map generation,
    // see https://webpack.js.org/plugins/source-map-dev-tool-plugin/
    devtool,
    'optimization': {
        'runtimeChunk': true
    },
    'plugins': [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        })
    ],
    'module': {
        'rules': [
            {
                'test': /\.js$/,
                // 'include': path.resolve(paths.appSrc),
                'exclude': /(node_modules)/,
                'use': {
                    'loader': "babel-loader"
                }
            },

            // No CSS in this project (in separate files at least).
            // keep for later tho

            /*{
                // look for .css or .scss files
                'test': /\.(css|scss)$/,
                // in the `src` directory
                'include': [ path.resolve(paths.appSrc) ],
                'use': [
                    {
                        'loader': "style-loader"
                    },
                    {
                        'loader': "css-loader",
                        'options': {
                            'discardDuplicates': true,
                            'importLoaders': 1,
                            // This enables local scoped CSS based in CSS Modules spec
                            'modules': true,
                            // generates a unique name for each class (e.g. app__app___2x3cr)
                            'localIdentName': "[name]__[local]___[hash:base64:5]"
                        }
                    }
                    // Add additional loaders here. (e.g. sass-loader)
                ]
            }*/
        ]
    }
}));
