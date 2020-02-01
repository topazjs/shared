'use strict';
/* @flow */

import React from 'react';
import ErrorCatcher from '../shared/ErrorCatcher';

import { Checkbox } from '@smooth-ui/core-sc';

import {
    IconNames
} from "@blueprintjs/icons";

import {
    options as commonOptions,
    settings as commonSettings,
} from '../../utils/common';

import type {
    optionType,
    settingsType
} from '../../utils/common';

export default function CheckboxControl ( props: settingsType ) {
    const {
        id,
        onChange,
        // choices,
        value,
    } = props;

    return (
        <ErrorCatcher>
            <Checkbox
                id={id}
                name={id}
                className={CheckboxControl.settings.className}
                onChange={e => onChange(!!e?.target?.checked)}
                checked={value} />
        </ErrorCatcher>
    );
};

CheckboxControl.settings = {
    ...commonSettings,
    'controlType': `Checkbox`,
    'value': false,
    'dynamic': true,
    'label': `Checkbox`,
    'icon': IconNames.SQUARE,
    'className': `flex flex-wrap tw-mx-3 tw-mb-2`,
};

CheckboxControl.options = commonOptions;
