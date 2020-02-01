'use strict';
/* @flow */

import React from 'react';

import ErrorCatcher from '../shared/ErrorCatcher';

import {
    IconNames
} from "@blueprintjs/icons";

import {
    settings as commonSettings,
} from '../common';

import type {
    settingsType,
} from '../common';

export default function TextInput ( props: settingsType ) {
    const {
        id,
        state,
        value,
        onChange,
        className = TextInput.settings.className,
        required = state.get(`required`) || false,
        placeholder = state.get(`placeholder`) || ``,
    } = props;

    return (
        <ErrorCatcher>
            <input
                type={`text`}
                id={id}
                name={id}
                value={value}
                onChange={e => onChange(e?.target?.value || ``)}
                className={className}
                required={required}
                placeholder={placeholder}
                aria-autocomplete={`none`} />
        </ErrorCatcher>
    );
};

TextInput.settings = {
    ...commonSettings,
    'controlType': `TextInput`,
    'label': `Text input`,
    'icon': IconNames.TEXT_HIGHLIGHT,
    'helpText': `(optional)`,
    'wrapClass': `tw-w-1/3`,
    'className': `tw-appearance-none tw-border tw-rounded tw-py-2 tw-px-3 tw-text-grey-darker tw-leading-tight focus--tw-outline-none focus--tw-shadow-outline`,
    'value': ``,
};
