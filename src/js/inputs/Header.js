'use strict';
/* @flow */

import React from 'react';

import ErrorCatcher from '../shared/ErrorCatcher';

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

export type propsType = {
    value: string,
    size: string,
};

export const Control = ( props: propsType ) => {
    const {
        size,
        value
    } = props;

    const Wrapper = Header.sizes[ size ];

    return (
        <div className={`box`}>
            <Wrapper>
                {value}
            </Wrapper>
        </div>
    );

};

export type wrapPropsType = {
    ...propsType,
    initialValue: ?string,
};

export default function Header ( props: wrapPropsType ) {
    const {
        size = `medium`,
        value = Header.settings.initialValue
    } = props;

    return (
        <ErrorCatcher>
            <Control
                value={value}
                size={size} />
        </ErrorCatcher>
    );
};

Header.settings = {
    ...commonSettings,
    'controlType': `Header`,
    'initialValue': `Header title`,
    'dynamic': false,
    'label': `Header`,
    'icon': IconNames.HEADER
};

Header.options = [
    ...commonOptions,
];

Header.sizes = {
    extraLarge: ( { children } ) =>
        <h1>{children}</h1>,

    large: ( { children } ) =>
        <h2>{children}</h2>,

    medium: ( { children } ) =>
        <h3>{children}</h3>,

    small: ( { children } ) =>
        <h4>{children}</h4>,

    extraSmall: ( { children } ) =>
        <h5>{children}</h5>
};
