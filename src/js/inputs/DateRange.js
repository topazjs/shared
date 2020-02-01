'use strict';

import moment from 'moment-timezone';

import React, {
    PureComponent,
} from 'react';

import ErrorCatcher from '../shared/ErrorCatcher';

import { enUS } from 'date-fns/locale'
import {
    DateRangePickerCalendar,
    START_DATE,
} from 'react-nice-dates';

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

export default function DateRange ( props: propsType ) {
    const {
        // helpText,
        value,
        onChange,
        // label,
    } = props;

    return (
        <ErrorCatcher>
            <DateRangePickerCalendar
                locale={enUS}
                startDate={new Date()}
                focus={START_DATE}
                onDateChange={date => {
                    const dateMoment = moment(date);
                    if ( !dateMoment.isSame(value) ) {
                        return onChange(date);
                    }
                }} />
        </ErrorCatcher>
    );
};

DateRange.settings = {
    ...commonSettings,
    'controlType': `DateRange`,
    'value': moment().format(`L`),
    'dynamic': true,
    'label': `Date Range`,
    'icon': `calendar`
};

DateRange.options = commonOptions;
