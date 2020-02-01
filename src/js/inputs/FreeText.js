'use strict';
/* @flow */

import React, {
    PureComponent
} from 'react';

import {
    List,
} from 'immutable';

import { Option } from '../../data/starters';

import type { optionsListType } from '../../data/starters';
import {
    fontSizeOption,
    freeTextValueOption,
    labelOption,
} from '../../utils/options';

import ErrorCatcher from '../shared/ErrorCatcher';

import {
    IconNames
} from "@blueprintjs/icons";

import {
    fontSizes,
} from '../../utils/helper';

import {
    options as commonOptions,
    settings as commonSettings,
} from '../../utils/common';

import type {
    settingsType,
} from '../../utils/common';

export type propsType = {
    value: string,
    fontSize: string,
};

export default class FreeText extends PureComponent <propsType> {
    static settings: settingsType = {
        ...commonSettings,
        'controlType': `FreeText`,
        'value': `Enter some static text here...`,
        'dynamic': false,
        'label': `Free text`,
        'icon': IconNames.PARAGRAPH,
        'fontSize': `14`,
    };

    static options: optionsListType = List([
        labelOption,
        fontSizeOption,
        freeTextValueOption,
    ]);

    render () {
        const {
            state,
            value,
        } = this.props;

        const fontSize = state.get(`fontSize`);

        const style = fontSizes[ fontSize ];

        return (
            <ErrorCatcher>
                <div className={`box`}>
                    <p style={style}>
                        {value}
                    </p>
                </div>
            </ErrorCatcher>
        );
    }
};
