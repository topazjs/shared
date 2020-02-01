'use strict';
/* @flow */

import React, {
    PureComponent
} from 'react';

import type { optionsListType } from '../../data/starters';

import ErrorCatcher from '../shared/ErrorCatcher';

import {
    IconNames
} from "@blueprintjs/icons";

import {
    Intent,
    TextArea
} from '@blueprintjs/core';

import {
    settings as commonSettings,
    options as commonOptions,
} from '../../utils/common';

import type {
    optionType,
    settingsType,
} from '../../utils/common';

import TextInput from './TextInput';

export default class Textarea extends PureComponent <settingsType> {
    static settings = {
        ...commonSettings,
        'controlType': `Textarea`,
        'helpText': `Multi-line, bulk text input`,
        'dynamic': true,
        'label': `Textarea`,
        'className': TextInput.settings.className,
        'icon': IconNames.NEW_TEXT_BOX
    };

    static options: optionsListType = commonOptions;

    render () {
        const {
            id,
            state,
            value,
            onChange,
        } = this.props;

        const required = state.get(`required`);

        return (
            <ErrorCatcher>
                <TextArea
                    id={id}
                    name={id}
                    dir="auto"
                    intent={Intent.PRIMARY}
                    onChange={e => onChange(e?.target?.value || ``)}
                    rows={4}
                    value={value}
                    required={required}
                />
            </ErrorCatcher>
        );
    }
}
