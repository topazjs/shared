'use strict';
/* @flow */

import { IconNames } from '@blueprintjs/icons';
import React, {
    PureComponent
} from 'react';

import {
    List
} from "immutable";
import {
    options as commonOptions,
    settings as commonSettings,
} from '../../utils/common';

export const SingleSelectInner = props => {
    const {
        onChange,
        children,
        value,
        id,
        fieldName
    } = props;

    return (
        <select
            onChange={event => {
                const {
                    value
                } = event.target;

                return onChange(value);
            }}
            value={value || ``}
            id={id}
            className={SingleSelect.settings.className}>
            <option
                key="empty"
                value="">
                Select
            </option>
            {children}
        </select>
    );
};

export type wrapPropsType = {
    onChange: Function,
    id: string,
    state: string,
    value: string,
    choices: [{
        value: string,
        label: ?string,
    }]
};

export default class SingleSelect extends PureComponent<wrapPropsType> {
    render () {
        const {
            makeOptionList,
        } = this;

        const {
            choices,
            value,
            ...props
        } = this.props;

        const options = makeOptionList(choices);

        return (
            <SingleSelectInner
                {...props}
                value={value}>
                {options}
            </SingleSelectInner>
        );
    }

    makeOptionList = optionsList => optionsList.map(
        ( { label, value }, i ) =>
            <option
                key={`${value}-${i}`}
                value={value}>
                {label || value}
            </option>
    );
}

SingleSelect.settings = {
    ...commonSettings,
    'controlType': `SingleSelectSync`,
    'label': `Single-select`,
    'icon': IconNames.PROPERTY,
    'helpText': ``,
    'className': `tw-block tw-appearance-none tw-w-full tw-bg-gray-200 tw-border tw-border-gray-200 tw-text-gray-700 tw-py-3 tw-px-4 tw-pr-8 tw-rounded tw-leading-tight focus--tw-outline-none focus--tw-bg-white focus--tw-border-gray-500`,
    'value': ``,
    'choices': []
};

SingleSelect.options = commonOptions;
