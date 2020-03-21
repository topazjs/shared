'use strict';
/* @flow */

import React from 'react';
import { INVALID } from '../info/intentions';
import { ErrorCatcher } from '../ErrorCatcher';
import styled from 'styled-components';

import {
    iconMap,
    standardColorMap,
    darkerColorMap,
} from '../info/colors';

export const StyledHelpText = styled.p`
    font-style: italic;
    font-size: 0.75rem;
`;

export type propsType = {
    text: string,
    className: string,
    inputName: string,
    hideWhenValid: boolean,
    invalid: boolean,
};

export const HelpTextInner = ( props: propsType ) => {
    const {
        text,
        className,
        hideWhenValid,
        invalid,
    } = props;

    if ( hideWhenValid && !invalid ) {
        return null;
    }

    const color = invalid
        ? standardColorMap[ INVALID ]
        : `#606F7B`;

    return (
        <StyledHelpText
            className={className}
            style={{ color }}>
            {text || ' '}
        </StyledHelpText>
    );
};

export type wrapPropsType = {
    text: string,
    className: ?string,
    inputName: ?string,
    hideWhenValid: boolean,
    invalid: boolean,
};

export default function HelpText ( props: wrapPropsType ) {
    const {
        text = ``,
        className = ``,
        hideWhenValid = true,
        invalid = false,
        inputName,
    } = props;

    return (
        <ErrorCatcher>
            <HelpTextInner
                inputName={inputName}
                text={text}
                className={className}
                hideWhenValid={hideWhenValid}
                invalid={invalid} />
        </ErrorCatcher>
    );
}
