'use strict';
/* @flow */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import InputWrap from '../src/components/InputWrap';
import {
    standardColorMap,
    iconMap,
} from '../src/info/colors';

export default {
    title: 'Input wrap - label, icon(s), help text',
    component: InputWrap,
};

const Input = props => {
    const [ value, setValue ] = useState(``);

    return (
        <input
            required
            type={`text`}
            name={`my-input`}
            id={`my-input`}
            value={value}
            onChange={e => setValue(e.target.value)} />
    );
}

export const RequiredInput = () => {
    return (
        <InputWrap
            inputName={`my-input`}
            labelText={`Social Security Number`}
            helpText={`Not really..lol`}
            required>
            <Input />
        </InputWrap>
    );
};

export const NotRequiredInput = () => {
    return (
        <InputWrap
            inputName={`my-input`}
            labelText={`Favorite Pizza`}
            helpText={`I'd go pineapple chicken tomato bbq`}>
            <Input />
        </InputWrap>
    );
};

export const IconInput = () => {
    const [ value, setValue ] = useState(``);
    const icon = iconMap[ value ] || iconMap[ value.toUpperCase() ];

    const playWithIcons = icon
        ? <FontAwesomeIcon
            style={{ color: standardColorMap[ value.toUpperCase() ] }}
            icon={icon} />
        : value;

    return (
        <InputWrap
            inputName={`my-input`}
            labelText={`Try typing some random words to render random icons (error, invalid, success, etc)`}
            helpText={playWithIcons}
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
