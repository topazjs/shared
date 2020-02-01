'use strict';

import React from 'react';

import {
    NumericInput,
} from '@blueprintjs/core';

import ErrorCatcher from '../shared/ErrorCatcher';

import {
    IconNames
} from "@blueprintjs/icons";

import {
    settings as commonSettings,
    options as commonOptions,
} from '../../utils/common';

import type {
    settingsType,
    optionType,
} from '../../utils/common';

export type propsType = {
    className: string,
    icon: string,
    value: string,
    onChange: Function,
    placeholder: string,
};

export default function NumberInput ( props: propsType ) {
    const {
        id,
        onChange,
        helpText = NumberInput.settings.helpText,
        value = NumberInput.settings.initialValue,
        placeholder = NumberInput.settings.placeholder,
        label = NumberInput.settings.label,
    } = props;

    return (
        <ErrorCatcher>
            <NumericInput
                value={value}
                allowNumericCharactersOnly={true}
                onValueChange={newValue => {
                    if ( newValue !== value && ( !isNaN(parseFloat(newValue)) || newValue === `` ) ) {
                        onChange(newValue);
                    }
                }}
                placeholder={placeholder} />
        </ErrorCatcher>
    );
};

NumberInput.settings = {
    ...commonSettings,
    'controlType': `NumberInput`,
    'value': `0`,
    'dynamic': true,
    'label': `Number`,
    'icon': IconNames.NUMERICAL
};

NumberInput.options = commonOptions;
