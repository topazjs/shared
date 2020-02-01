'use strict';

import React from 'react';

import {
    TagInput,
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

export default function Tags ( props: propsType ) {
    const {
        helpText = Tags.settings.helpText,
        value = Tags.settings.initialValue,
        onChange,
        label = Tags.settings.label,
    } = props;

    return (
        <ErrorCatcher>
            <TagInput
                className={Tags.settings.className}
                addOnBlur={true}
                onChange={values => {
                    const value = values.filter(text => text.trim()).join();
                    onChange(value);
                }}
                values={value.split(/,/)}
            />
        </ErrorCatcher>
    );
};

Tags.settings = {
    ...commonSettings,
    'controlType': `Tags`,
    'initialValue': ``,
    'dynamic': true,
    'label': `Tags`,
    'icon': IconNames.TAG,
    'helpText': `Tag stuff!`,
};

Tags.options = [
    ...commonOptions,
];
