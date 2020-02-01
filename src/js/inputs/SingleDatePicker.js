'use strict';

import moment from 'moment';
import React from 'react';

import ErrorCatcher from '../shared/ErrorCatcher';

import {
    DatePicker,
} from 'react-nice-dates';

import { enUS } from 'date-fns/locale'

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
    className: string,
    icon: string,
    value: string,
    onChange: Function,
    placeholder: string,
};

export const formatDate = format =>
    ( date, locale ) => moment(date)
        .locale(locale)
        .format(format);

export const parseDate = format =>
    ( str, locale ) => moment(str, format)
        .locale(locale)
        .toDate();

export const placeholder = format =>
    moment()
        .format(format)
        .replace(/[0-9]+\//g, `01/`)
        .replace(/[0-9]+\:[0-9]+/g, `00:00`);

function getMomentFormatter ( format: string ): IDateFormatProps {
    // note that locale argument comes from locale prop and may be undefined
    return {
        formatDate: formatDate(format),
        parseDate: parseDate(format),
        placeholder: placeholder(format),
    }
};

export default function SingleDatePicker ( props: propsType ) {
    const {
        helpText,
        value,
        onChange,
        label,
    } = props;

    return (
        <ErrorCatcher>
            <DatePicker
                locale={enUS}
                date={new Date(value)}
                onDateChange={date => {
                    return onChange(date);
                }}>
                {( { inputProps, focused } ) => (
                    <input className={'input' + (focused ? ' -focused' : '')} {...inputProps} />
                )}
            </DatePicker>
        </ErrorCatcher>
    );
};

SingleDatePicker.settings = {
    ...commonSettings,
    'controlType': `SingleDatePicker`,
    'value': moment().format(`L`),
    'dynamic': true,
    'label': `DatePicker`,
    'icon': `calendar`
};

SingleDatePicker.options = commonOptions;
