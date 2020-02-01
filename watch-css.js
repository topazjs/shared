'use strict';

const fs = require('fs');
const compileCSSInit = require('./compile-css');
const directories = [
    `src/css`,
    `styles/css`,
];
const state = {
    'compiling': false,
    'setState': function ( prop, newState ) {
        this[ prop ] = newState;
        return this;
    },
    'getState': function ( prop ) {
        return this[ prop ];
    }
};
const compileCSS = compileCSSInit.bind(null, state);
directories.forEach(directory => (
    fs.watch(directory, compileCSS) &&
    console.log(`Watching ${directory}`)
));
