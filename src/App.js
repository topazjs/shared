'use strict';
/* @flow */

import React from 'react';

import * as helpers from './utils';
import * as Intentions from './info/intentions';
import * as colors from './info/colors';
import ErrorCatcher, { withErrorCatcher } from './components/ErrorCatcher';
import Loader from './components/Loader';
import Notice from './components/Notice';
import InputWrap from './components/InputWrap';


export default {
    ErrorCatcher,
    withErrorCatcher,
    Loader,
    Notice,
    InputWrap,
    colors,
    helpers,
    Intentions,
};
