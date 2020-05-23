'use strict';
/* @flow */

import React from 'react';
import ErrorCatcher from '../ErrorCatcher';
import styled, { css } from 'styled-components';

import type {
    StyledComponent,
} from 'styled-components';

import {
    FontAwesomeIcon,
} from '@fortawesome/react-fontawesome'

import {
    standardColorMap,
} from '../info/colors';

import {
    PLAIN,
} from '../info/intentions';

export const StyledIconCSS = css`
    pointer-events: none;
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    padding-left: 2px;
    padding-right: 2px;
    font-size: 0.5em;
    width: 1rem;
    height: 80%;
`;

export type iconWrapType = ({
    position: string,
    color: string,
    children: React$Component<FontAwesomeIcon>,
}) => StyledComponent;

export const IconWrap: iconWrapType = React.memo(styled.div`
    ${StyledIconCSS}
    ${props => props.position}: 0;
    color: ${props => standardColorMap[ props.color ]}
`);

export type innerPropsType = {
    position: string,
    color: string,
    icon: ?string,
};

export const InputIconInner = ( props: innerPropsType ) => {
    const {
        color,
        icon,
        position,
    } = props;

    return (
        <IconWrap
            color={color}
            position={position}>
            <FontAwesomeIcon
                icon={icon} />
        </IconWrap>
    );
};

export type wrapPropsType = {
    icon: string,
    position: ?string,
    color: ?string,
};

export default function InputIcon ( props: wrapPropsType ) {
    const {
        position = `left`,
        icon = ``,
        color = PLAIN,
    } = props;

    return (
        <ErrorCatcher>
            <InputIconInner
                position={position}
                color={color}
                icon={icon} />
        </ErrorCatcher>
    );
}
