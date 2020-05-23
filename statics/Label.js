'use strict';
/* @flow */

import React from 'react';
import { ErrorCatcher } from '../ErrorCatcher';
import styled from 'styled-components';

import type {
    StyledComponent,
} from 'styled-components';

export type styledReqType = ( {
    children: string,
} ) => StyledComponent;

export const Required: styledReqType = React.memo(styled.strong`
    color: #F66D9B;
    text-align: right;
`);

export const requiredStar: React$Node = (
    <Required>*</Required>
);

export type styledLabelType = ({
    children: React$Node[],
}) => StyledComponent;

export const StyledLabel: styledLabelType = React.memo(styled.label`
    display: block;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    color: #606F7B;
    font-weight: 700;
    font-size: 0.75rem;
    margin-bottom: 2px;
`);

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
            htmlFor={inputName}
            className={className}>
            {text} {children}
        </StyledLabel>
    );
};

export type wrapPropsType = propsType;

export function Label ( props: wrapPropsType ) {
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
