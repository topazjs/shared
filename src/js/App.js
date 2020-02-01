'use strict';
/* @flow */

import inputs from './inputs';

import ErrorCatcher from './shared/ErrorCatcher';

import Loader from './shared/Loader';

import Notice from './shared/Notice';

export default {
    ...inputs,
    ErrorCatcher,
    Loader,
    Notice,
};
