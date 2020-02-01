'use strict';
/* @flow */

import React from 'react';

import Label from '../statics/Label';
import HelpText from '../statics/HelpText';
import InputIcon from '../statics/InputIcon';
import ErrorCatcher from '../shared/ErrorCatcher';

export type innerPropsType = {
    children: any,
    error: ?string,
    notifyIcon: string,
    stateColor: string,
    inputName: string,
    helpText: string,
    labelText: string,
    getOptions: ?Func,
    value: ?(string|boolean|number),
    valid: ?boolean,
    invalid: ?boolean,
    iconName: ?string,
};

export const InputWrapInner = ( props: innerPropsType ) => {
    const {
        children,
        error,
        touched,
        visited,
        inputName,
        helpText,
        labelText,
        getOptions,
        value,
        valid,
        invalid,
        required = false,
        showLeftIcon = false,
        showRightIcon = false,
        labelAfterInput = false,
        // wrapClass = `tw-flex`,
        wrapClass = ``,
        // width = `3/10`,
        width = ``,
        labelClass = ``,
        hideHelpText: hideWhenValid = false,
    } = props;

    const stateColor = valid
        ? 'success'
        : value
            ? 'danger'
            : '';

    const leftIcon = showLeftIcon !== false
        ? (
            <InputIcon
                key={`left-icon`}
                color={stateColor}
                position={`left`}
                iconName={`circle`} />
        )
        : null;

    const rightIcon = showRightIcon !== false
        ? (
            <InputIcon
                key={`right-icon`}
                color={stateColor}
                position={`right`}
                iconName={valid ? `check` : value ? `exclamation-triangle` : ``} />
        )
        : null;

    const hasIconsLeft = leftIcon
        ? `tw-pl-4`
        : ``;

    const hasIconsRight = rightIcon
        ? `tw-pr-4`
        : ``;

    const labelEl = (
        <Label
            key={`label-key`}
            text={labelText}
            inputName={inputName}
            className={labelClass}
            required={required} />
    );

    const widthClass = width ? `tw-w-${width}` : ``;

    // old classes for wrap - tw-flex-wrap tw-items-center
    return (
        <div className={`${wrapClass} ${widthClass} tw-text-xl tw-mx-2 tw-py-2`}>

            <div
                key={`main-key`}
                className={`${hasIconsRight} ${hasIconsLeft} tw-mb-3`}>

                {!labelAfterInput && labelEl}

                {children}

                {labelAfterInput && labelEl}

                {leftIcon}

                {rightIcon}
            </div>

            <div
                key={`help-text-key`}>
                <HelpText
                    text={helpText || error}
                    hideWhenValid={hideWhenValid}
                    invalid={invalid && touched} />
            </div>
        </div>
    );
};

export type propsType = innerPropsType;

export default function InputWrap ( props: propsType ) {
    return (
        <ErrorCatcher>
            <InputWrapInner
                {...props} />
        </ErrorCatcher>
    );
}
