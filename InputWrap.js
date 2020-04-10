'use strict';
/* @flow */

import React from 'react';

import {
    faCircle,
} from '@fortawesome/free-solid-svg-icons';

import {
    SUCCESS,
    INVALID,
} from './info/intentions';

import styled from 'styled-components';

import Label from './statics/Label';
import HelpText from './statics/HelpText';
import InputIcon from './statics/InputIcon';
import ErrorCatcher from './ErrorCatcher';

import {
    iconMap,
    standardColorMap,
} from './info/colors';

export const StyledInputWrap = styled.div`
    font-size: 1.5rem;
    margin-left: 2px;
    margin-right: 2px;
    padding-top: 4px;
    padding-bottom: 4px;
    margin-top: 8px;
    margin-bottom: 8px;
    width: ${props => props.width || 'auto'}
`;

export const StyledInputWrapInner = styled.div`
    margin-bottom: 4px;
`;

export type innerPropsType = {
    children: any,
    error: ?string,
    notifyIcon: string,
    stateColor: string,
    inputName: string,
    helpText: string,
    labelText: string,
    value: ?(string|boolean|number),
    valid: ?boolean,
    invalid: ?boolean,
    icon: ?string,
    required: ?boolean,
    showLeftIcon: ?boolean,
    showRightIcon: ?boolean,
    labelAfterInput: ?boolean,
    wrapClass: ?string,
    width: ?string|number,
    labelClass: ?string,
    hideHelpText: ?boolean,
    hideHelpTextWhenValid: ?boolean,
};

export const InputWrapInner = ( props: innerPropsType ) => {
    const {
        children,
        error,
        touched,
        inputName,
        helpText,
        helpTextClass = ``,
        labelText,
        value,
        valid,
        invalid,
        required,
        showLeftIcon,
        showRightIcon,
        labelAfterInput,
        wrapClass,
        width,
        labelClass,
        hideHelpText,
        hideHelpTextWhenValid,
    } = props;

    const stateColor = valid
        ? standardColorMap[ SUCCESS ]
        : value
            ? standardColorMap[ INVALID ]
            : ``;

    const leftIcon = showLeftIcon !== false
        ? (
            <InputIcon
                key={`left-icon`}
                color={stateColor}
                position={`left`}
                icon={faCircle} />
        )
        : null;

    const rightIcon = showRightIcon !== false
        ? (
            <InputIcon
                key={`right-icon`}
                color={stateColor}
                position={`right`}
                icon={valid ? iconMap[ SUCCESS ] : value ? iconMap[ INVALID ] : ``} />
        )
        : null;

    const labelEl = (
        <Label
            key={`label-key`}
            text={labelText}
            inputName={inputName}
            className={labelClass}
            required={required} />
    );

    let helpTextEl = null;
    if ( !hideHelpText ) {
        helpTextEl = (
            <div key={`help-text-key`}>
                <HelpText
                    className={helpTextClass}
                    text={helpText || error}
                    hideWhenValid={hideHelpTextWhenValid}
                    invalid={invalid && touched} />
            </div>
        );
    }

    const innerStyles = {
        'paddingLeft': leftIcon
            ? 4
            : ``,
        'paddingRight': rightIcon
            ? 4
            : ``,
    };

    return (
        <StyledInputWrap
            width={width}
            className={wrapClass}>

            <StyledInputWrapInner
                key={`main-key`}
                style={innerStyles}>

                {!labelAfterInput && labelEl}

                {children}

                {labelAfterInput && labelEl}

                {leftIcon}

                {rightIcon}
            </StyledInputWrapInner>

            {helpTextEl}
        </StyledInputWrap>
    );
};

export type propsType = innerPropsType;

export default function InputWrap ( props: propsType ) {
    const {
        required = false,
        showLeftIcon = false,
        showRightIcon = false,
        labelAfterInput = false,
        hideHelpText = false,
        hideHelpTextWhenValid = false,
        wrapClass = ``,
        width = ``,
        labelClass = ``,
    } = props;

    return (
        <ErrorCatcher>
            <InputWrapInner
                {...props}
                required={required}
                showLeftIcon={showLeftIcon}
                showRightIcon={showRightIcon}
                labelAfterInput={labelAfterInput}
                hideHelpText={hideHelpText}
                hideHelpTextWhenValid={hideHelpTextWhenValid}
                wrapClass={wrapClass}
                width={width}
                labelClass={labelClass} />
        </ErrorCatcher>
    );
}
