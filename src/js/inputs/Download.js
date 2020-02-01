'use strict';
/* @flow */

import React, {
    PureComponent
} from 'react';

import ErrorCatcher from '../shared/ErrorCatcher';

import {
    Icon,
    NonIdealState
} from '@blueprintjs/core';

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

export type controlPropsType = {
    value: string,
    size: string
};

export const Control = ( props: controlPropsType ) => {
    const {
        icon = Download.settings.icon,
        value = Download.settings.initialValue,
        label = Download.settings.label,
        handleClick,
        onChange,
        id,
    } = props;

    return (
        <ErrorCatcher>
            <div className={`bp3-form-group bp3-inline`}>
                <label
                    className="bp3-label"
                    htmlFor="example-form-group-input-d">
                    Download URL:
                </label>
                <div className="bp3-form-content">
                    <div className="bp3-input-group">
                        <input
                            className={`bp3-input`}
                            type={`text`}
                            value={value}
                            id={id}
                            name={id}
                            onChange={e => onChange(e?.target?.value || ``)} />
                    </div>
                </div>
                <div
                    className={`col-xs`}
                    onClick={handleClick}>
                    <NonIdealState
                        className={value ? `form-control--download` : ``}
                        title={label}
                        visual={icon}
                        description={`File may be external`}
                    />
                </div>
            </div>
        </ErrorCatcher>
    );
};

export type wrapPropsType = controlPropsType;

export default class Download extends PureComponent<wrapPropsType> {
    static settings: settingsType = {
        ...commonSettings,
        'controlType': `Download`,
        'initialValue': ``,
        'dynamic': false,
        'label': `Download`,
        'icon': IconNames.DOWNLOAD
    };

    static options: optionType[] = [
        ...commonOptions,
    ];

    render () {
        return (
            <ErrorCatcher>
                <Control
                    {...this.props}
                    handleClick={this.handleClick}/>
            </ErrorCatcher>
        );
    }

    handleClick = event => {
        if ( !this.props.value ) {
            return;
        }
        const el = document.createElement(`a`);
        el.title = this.props.label;
        el.download = ``;
        el.href = this.props.value;
        el.click();
    };
}
