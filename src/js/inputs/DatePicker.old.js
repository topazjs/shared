'use strict';

import moment from 'moment';
import React from 'react';

import {
    DateInput,
    IDateFormatProps
} from "@blueprintjs/datetime";

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

export default function DatePicker ( props: propsType ) {
    const {
        helpText,
        value,
        onChange,
        label,
    } = props;

    return (
        <ErrorCatcher>
            <DateInput
                {...getMomentFormatter(`L LT`)}
                locale={`en`}
                onChange={date => {
                    const dateMoment = moment(date);
                    if ( !dateMoment.isSame(value) ) {
                        return onChange(date);
                    }
                }}
                value={new Date(value)}
                timePrecision={0}
            />
        </ErrorCatcher>
    );
};

DatePicker.settings = {
    ...commonSettings,
    'controlType': `DatePicker`,
    'value': moment().format(`L`),
    'dynamic': true,
    'label': `Date`,
    'icon': IconNames.CALENDAR
};

DatePicker.options = commonOptions;
