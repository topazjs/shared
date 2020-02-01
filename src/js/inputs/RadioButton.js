'use strict';

import React from 'react';
import ErrorCatcher from '../shared/ErrorCatcher';

import {
    IconNames
} from "@blueprintjs/icons";

import {
    Radio,
    RadioGroup,
} from '@smooth-ui/core-sc';

import {
    settings as commonSettings,
    options as commonOptions,
} from '../../utils/common';

import type {
    settingsType,
    optionType,
} from '../../utils/common';

export default function RadioButton ( props ) {
    const {
        fieldName,
        onChange,
        required,
        choices,
        label,
        value,
        id: controlId,
    } = props;

    return (
        <ErrorCatcher>
            <RadioGroup required={required}>
                {choices.map(( { value: inputValue, label }, i ) => {
                    return (
                        <label key={`radio-label-${inputValue}-${i}`}>
                            <Radio
                                checked={inputValue === value}
                                value={inputValue}
                                name={fieldName || controlId}
                                id={controlId}
                                onChange={e => e?.target?.checked && onChange(inputValue)} />
                            {label}
                        </label>
                    );
                })}
            </RadioGroup>
        </ErrorCatcher>
    );
};

RadioButton.settings = {
    ...commonSettings,
    'controlType': `RadioButton`,
    'value': ``,
    'dynamic': true,
    'label': `Radio`,
    'icon': IconNames.SELECTION,
    'choices': [
        {
            'value': `first`,
            'label': `First`
        },
        {
            'value': `second`,
            'label': `Second`
        },
        {
            'value': `third`,
            'label': `Third`
        }
    ]
};

RadioButton.options = commonOptions;
