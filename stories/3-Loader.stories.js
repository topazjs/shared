'use strict';

import React, { useState } from 'react';
import { Loader } from '../src/components/Loader';

export default {
  title: 'Loader',
  component: Loader,
};

export const Loading = () => <Loader />;

export const DismissableLoader = () => {
    const [ visible, toggle ] = useState(true);
    return visible && <Loader handleClick={() => toggle(!visible)} />;
};
