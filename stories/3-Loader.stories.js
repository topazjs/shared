'use strict';

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Loader from '../src/components/Loader';

export default {
  title: 'Loader',
  component: Loader,
};

export const Takeover = () => {
    const [ visible, toggle ] = useState(true);
    return visible && <Loader handleClick={() => toggle(!visible)} />;
};
