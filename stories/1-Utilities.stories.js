'use strict';

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Loader from '../src/js/components/Loader';

export default {
  title: 'Loader',
  component: Loader,
};

export const Constrained = () => {
    const [ visible, toggle ] = useState(true);
    return (
        <div style={{ "position": "relative", "width": 600, "height": 600 }}>
            {visible && <Loader handleClick={() => toggle(!visible)} /> }
        </div>
    );
}

export const Takeover = () => {
    const [ visible, toggle ] = useState(true);
    return visible && <Loader handleClick={() => toggle(!visible)} />;
}
