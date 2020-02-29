'use strict';
/* @flow */

import * as helpers from './utils';
import * as Intentions from './info/intentions';
import * as Colors from './info/colors';
import * as ErrorCatcher from './components/ErrorCatcher';
import * as Loader from './components/Loader';
import * as Notice from './components/Notice';
import * as InputWrap from './components/InputWrap';

export default {
    helpers,
    Intentions,
    Colors,
    ...ErrorCatcher,
    ...Loader,
    ...Notice,
    ...InputWrap
};

// import * as helpers from './utils';
// import * as Intentions from './info/intentions';
// import * as Colors from './info/colors';
// import * as ErrorCatcher from './components/ErrorCatcher';
// import * as Loader from './components/Loader';
// import * as Notice from './components/Notice';
// import * as InputWrap from './components/InputWrap';
//
// const somethingToExport = {
//     helpers,
//     Intentions,
//     Colors,
//     ErrorCatcher,
//     Loader,
//     Notice,
//     InputWrap,
// };

// console.log(`something to export 1 `, somethingToExport);
// debugger;
// export const somethingElse = somethingToExport;
// export default somethingToExport;

/*
import * as helpers from './utils';
import * as Intentions from './info/intentions';
import * as Colors from './info/colors';
import * as ErrorCatcher from './components/ErrorCatcher';
import * as Loader from './components/Loader';
import * as Notice from './components/Notice';
import * as InputWrap from './components/InputWrap';

export default {
    helpers,
    Intentions,
    Colors,
    ErrorCatcher,
    Loader,
    Notice,
    InputWrap,
};
*/
