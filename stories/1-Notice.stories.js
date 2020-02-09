'use strict';
/* @flow */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Notice from '../src/components/Notice';

export default {
  title: 'Notice',
  component: Notice,
};

export const Success = () => {
    return <Notice
        title={`Good job!!`}
        message={`Success message!`}
        type={`success`} />;
};

export const Error = () => {
    return <Notice
        title={`Oh crap.`}
        message={`You messed up dude.  Fix it.`}
        type={`error`} />;
};

export const Warning = () => {
    return <Notice
        title={`Hm something isn't right`}
        message={`Maybe we need more lorem ipsum.  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`}
        type={`warning`} />;
};

export const Info = () => {
    return <Notice
        title={`FYI`}
        message={`Just a little information you may want.`}
        type={`info`} />;
};

export const Plain = () => {
    return <Notice
        title={`Plain ol`}
        message={`Not really a reason to use this one.`}
        type={`plain`} />;
};