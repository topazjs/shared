'use strict';

const compressOutput = (
    typeof process.argv[ 2 ] === 'string' &&
    process.argv[ 2 ].toLowerCase() === 'dist'
);

const defaults = {
    'fromDir': `src/css/styles.css`,
    'to': `dist/css/styles.css`,
    'toMap': `dist/css/styles.css.map`
};

const {
    fromDir,
    to,
    toMap
} = defaults;

const filename = `./${fromDir}`;

const {
    promisify
} = require('util');

const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const tailwind = require('tailwindcss');
const postcss = require('postcss');
const imports = require('postcss-import');
const url = require('postcss-url');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const plugins = [
    imports({ 'addModulesDirectories': [ `node_modules` ] }),
    tailwind(`./tailwind.js`),
    autoprefixer,
    cssnano({ 'preset': `advanced` }),
].slice(0, Number(compressOutput) + 3);

const options = {
    'from': fromDir,
    to,
    'map': {
        'inline': false
    }
};

const write = ( to, toMap, state ) => async ( { css, map } ) => {
    const writes = [ writeFileAsync(to, css) ];
    if ( map ) {
        writes.push(writeFileAsync(toMap, map));
    }
    await Promise.all(writes);
    console.log(`CSS compiled`);
    if ( state ) {
        state.setState('compiling', false);
    }
};

const read = ( options, state ) => css => {
    console.log(`Compiling ${filename}...`);
    if ( css ) {
        postcss(plugins)
            .use(url([{
                // base path to search assets from
                "filter": `resources/icons/*`,
                // dir to copy assets
                "assetsPath": `webfonts`,
                // using hash names for assets (generates from asset content)
                // "useHash": true,

                'url': `copy` // "rebase", "inline" or "copy"
            }, {
                "url": `rebase`
            }]))
            .process(css, options)
            .then(write(to, toMap, state));
    }
    else {
        console.error(`CSS file content empty - ${filename}`);
    }
};

const compileCSS = async ( state, eventType, changed ) => {
    if ( state ) {
        if ( state.getState('compiling') === true ) {
            return;
        }
        console.log(`${changed} ${eventType}d.  Reading...`);
        state.setState('compiling', true);
    }

    const reader = read(options, state);
    const file = await readFileAsync(filename);
    return reader(file);
};

compileCSS().catch(console.error);

module.exports = compileCSS;
