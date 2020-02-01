'use strict';
/* @flow */

import React from 'react';

import {
    IconNames
} from "@blueprintjs/icons";

import {
    options as commonOptions,
    settings as commonSettings,
} from '../../utils/common';

import type {
    // optionType,
    settingsType as commonSettingsType
} from '../../utils/common';

import {
    Map,
} from 'immutable';

import ErrorCatcher from '../shared/ErrorCatcher';
import TextInput from './TextInput';

export type settingsType = {
    ...commonSettingsType,
    // options: optionType[],
};

export default function Phone ( props: settingsType ) {
    const {
        id,
        state,
        onChange,
        value = state.get(`value`),
        placeholder = state.get(`placeholder`),
        required = state.get(`required`),
        className = Phone.settings.className,
    } = props;

    return (
        <ErrorCatcher>
            <input
                id={id}
                name={id}
                type="phone"
                className={className}
                required={required}
                placeholder={placeholder}
                value={value ? Phone.maskInput(value) : value}
                onChange={e => onChange(Phone.unmaskInput(e?.target?.value || ``))} />
        </ErrorCatcher>
    );
}

Phone.phoneMaskMap = Map({
    'usa': /(\d{1,3})?((\d{1,3})?(\d{1,4})?)?$/
});

Phone.maskRemove = /^\+1|[^0-9]/g;

// @TODO - allow country input
// Phone.maskReplace = Phone.phoneMaskMap.get(COUNTRY);
Phone.maskReplace = Phone.phoneMaskMap.get(`usa`);

/**
 * @TODO - this assumes US phones - change to int'l once closer
 */
Phone.unmaskInput = value =>
    value
        .replace(Phone.maskRemove, ``)
        .slice(0, 10);

/**
 * @TODO - this assumes US phones - change to int'l once closer
 */
Phone.maskInput = value => {
    const replacer = ( text, areaCode = ``, fullHalf = ``, prefix = ``, suffix = `` ) => {
        let start = ``;
        let middle = ``;
        let end = ``;

        // Example final output: 999
        if ( areaCode ) {
            start = areaCode;

            // Example final output: (999) 999
            if ( prefix ) {
                start = `(${areaCode}) `;
                middle = prefix;

                // Example final output: (999) 999-9999
                if ( suffix ) {
                    middle = `${prefix}-`;
                    end = suffix;
                }
            }
        }

        return `${start}${middle}${end}`;
    };

    if ( value ) {
        const cleanValue = Phone.unmaskInput(value);

        if ( cleanValue.length > 0 ) {
            const prettyValue = cleanValue
                .replace(Phone.maskReplace, replacer)
                .trim();

            return prettyValue;
        }

        return cleanValue;
    }
    return ``;
};

Phone.settings = {
    ...commonSettings,
    'controlType': `Phone`,
    'label': `Phone input`,
    'icon': IconNames.PHONE,
    'helpText': `(optional)`,
    'className': TextInput.settings.className,
};

Phone.options = commonOptions;
