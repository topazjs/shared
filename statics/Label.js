'use strict';
/* @flow */

import React from 'react';
import ErrorCatcher from '../ErrorCatcher';
import styled from 'styled-components';

export const Required = styled.strong`
    color: #F66D9B;
    text-align: right;
`;

export const requiredStar = (
    <Required>*</Required>
);

export const StyledLabel = styled.label`
    display: block;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    color: #606F7B;
    font-weight: 700;
    font-size: 0.75rem;
    margin-bottom: 2px;
`;

export type propsType = {
    text: string,
    className: ?string,
    inputName: ?string,
    children: ?React$Node,
};

export const LabelInner = ( props: propsType ) => {
    const {
        text,
        className,
        inputName,
        children,
    } = props;

    return (
        <StyledLabel
            aria-label={text}
            htmlFor={inputName}
            className={className}>
            {text} {children}
        </StyledLabel>
    );
};

export type wrapPropsType = propsType;

export default function Label ( props: wrapPropsType ) {
    const {
        text = ``,
        className = ``,
        inputName = ``,
        required = false,
    } = props;

    return (
        <ErrorCatcher>
            <LabelInner
                text={text}
                className={className}
                inputName={inputName}>
                {required && requiredStar}
            </LabelInner>
        </ErrorCatcher>
    );
}
