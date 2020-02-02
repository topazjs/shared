'use strict';
/* @flow */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Notice from '../src/js/components/Notice';

export default {
  title: 'Notice',
  component: Notice,
};

export const Success = () => {
    // const [ visible, toggle ] = useState(true);
    return <Notice message={`Success message!`} title={`Good job`} type={`success`} />;
};
