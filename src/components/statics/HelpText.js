'use strict';
/* @flow */

import React from 'react';
import ErrorCatcher from '../ErrorCatcher';
import styled from 'styled-components';

import {
    iconMap,
    standardColorMap,
    darkerColorMap,
} from '../../utils/colors';

export const StyledHelpText = styled.p`
    color: #606F7B;
    font-style: italic;
    font-size: 0.75rem;
`;

export type propsType = {
    text: string,
    className: ?string,
    inputName: ?string,
    hideWhenValid: boolean,
    invalid: boolean,
};

export const HelpTextInner = ( props: propsType ) => {
    const {
        text = ``,
        className = ``,
        hideWhenValid = true,
        invalid = false,
    } = props;

    if ( hideWhenValid && !invalid ) {
        return null;
    }

    const color = invalid
        ? standardColorMap.invalid
        : `initial`;

    return (
        <StyledHelpText
            className={className}
            style={{ color }}>
            {text || ' '}
        </StyledHelpText>
    );
};

export type wrapPropsType = propsType;

export default function HelpText ( props: wrapPropsType ) {
    return (
        <ErrorCatcher>
            <HelpTextInner
                {...props} />
        </ErrorCatcher>
    );
}
