'use strict';
/* @flow */

import { Record } from 'immutable';

import type {
    RecordOf,
    Record as RecordType,
} from 'immutable';

export type settingsFieldsType = {
    id: string,
    controlType: string,
    groupId: ?string,
    label: string,
    className: ?string,
    wrapClassName: ?string,
    icon: ?string,
    dynamic: ?boolean,
    fieldName: ?string,
    helpText: ?string,
    placeholder: ?string,
    choices: ?string[],
    value: ?any,
    required: ?boolean,
    fontSize: ?string | number,
};

export const settingsFields: settingsFieldsType = {
    'id': ``,
    'controlType': null,
    'groupId': null,
    'label': ``,
    'className': `tw-w-1/3`,
    'wrapClassName': ``,
    'icon': ``,
    'dynamic': true,
    'fieldName': null,
    'helpText': ``,
    'placeholder': ``,
    'choices': [],
    'value': ``,
    'required': false,
    'fontSize': ``,
};

export type settingsType = RecordType<settingsFieldsType>;

export const Settings: settingsType = Record(settingsFields);

export const settings = settingsFields;
