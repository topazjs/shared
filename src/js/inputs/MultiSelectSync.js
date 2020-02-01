'use strict';

import React from 'react';

import {
    MenuItem
} from '@blueprintjs/core';

import {
    MultiSelect
} from '@blueprintjs/select';

import {
    IconNames
} from "@blueprintjs/icons";

import ErrorCatcher from '../shared/ErrorCatcher';

import {
    options as commonOptions,
    settings as commonSettings,
} from '../../utils/common';

import type {
    optionType,
    settingsType
} from '../../utils/common';

export default function MultiSelectSync ( props ) {
    const {
        onChange,
        loading,
        choices = MultiSelectSync.settings.choices,
        label,
        value = ``
    } = props;

    const valueArray = value
        ? value.split(/,/)
        : [];

    const { selectedItems, remainingOptions, } = choices
        .reduce(( map, opt ) => {
            if ( valueArray.includes(opt.id) ) {
                map.selectedItems.push(opt);
            }
            else {
                map.remainingOptions.push(opt);
            }

            return map;
        }, {
            'selectedItems': [],
            'remainingOptions': [],
        });

    return (
        <ErrorCatcher>
            <MultiSelect
                items={remainingOptions}
                itemRenderer={( data, props ) => {
                    return (
                        <MenuItem
                            key={`${data.label}-${data.id}`}
                            text={data.label}
                            onClick={() => {
                                const newValue = valueArray
                                    .concat(`${data.id}`)
                                    .join();
                                return onChange(newValue);
                            }}
                        />
                    );
                }}
                tagRenderer={( { id, label }, index ) => {
                    return <div>{label} ✔</div>
                }}
                tagInputProps={{
                    onRemove: ( _, index ) => {
                        return onChange(
                            valueArray
                                .filter(_id => _id !== selectedItems[ index ].id)
                                .join()
                        );
                    },
                    interactive: true,
                }}
                noResults={<div>No more choices available</div>}
                label={label}
                disabled={loading}
                selectedItems={selectedItems}
            />
        </ErrorCatcher>
    );
};

MultiSelectSync.settings = {
    ...commonSettings,
    'controlType': `MultiSelectSync`,
    'initialValue': ``,
    'dynamic': true,
    'label': `Multi-select`,
    'icon': IconNames.MULTI_SELECT,
    'choices': [
        {
            'id': `1`,
            'label': `Header`
        },
        {
            'id': `2`,
            'label': `MultiSelectSync`
        }
    ],
};

MultiSelectSync.options = [
    ...commonOptions,
];
