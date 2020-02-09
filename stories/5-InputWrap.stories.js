'use strict';
/* @flow */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import InputWrap from '../src/components/InputWrap';
import {
    iconMap,
} from '../src/utils/colors';

export default {
    title: 'Input wrap - label, input, icon(s), help text',
    component: InputWrap,
};

export const RequiredInput = () => {
    const [ value, setValue ] = useState(``);

    return (
        <InputWrap
            inputName={`my-input`}
            labelText={`Social Security Number`}
            helpText={`Not really..lol`}
            required>
            <input
                required
                type={`text`}
                name={`my-input`}
                id={`my-input`}
                value={value}
                onChange={e => setValue(e.target.value)} />
        </InputWrap>
    );
};

export const NotRequiredInput = () => {
    const [ value, setValue ] = useState(``);

    return (
        <InputWrap
            inputName={`my-input`}
            labelText={`Favorite Pizza`}
            helpText={`I'd go pineapple chicken tomato bbq`}>
            <input
                type={`text`}
                name={`my-input`}
                id={`my-input`}
                value={value}
                onChange={e => setValue(e.target.value)} />
        </InputWrap>
    );
};

export const IconInput = () => {
    const [ value, setValue ] = useState(``);

    const icon = iconMap[ value ];

    return (
        <InputWrap
            inputName={`my-input`}
            labelText={`Try typing some random words to render random icons (error, invalid, success, etc)`}
            helpText={icon ? <FontAwesomeIcon icon={icon} /> : value}
            showLeftIcon={!!icon}
            required>
            <input
                required
                type={`text`}
                name={`my-input`}
                id={`my-input`}
                value={value}
                onChange={e => setValue(e.target.value)} />
        </InputWrap>
    );
};
