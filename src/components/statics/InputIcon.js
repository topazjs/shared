'use strict';
/* @flow */

import React from 'react';
import { ErrorCatcher } from '../ErrorCatcher';
import styled, { css } from 'styled-components';

import {
    FontAwesomeIcon,
} from '@fortawesome/react-fontawesome'

import {
    standardColorMap,
} from '../../info/colors';

import {
    PLAIN,
} from '../../info/intentions';


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



export type propsType = {
    icon: string,
    position: string,
    color: string,
};

export const InputIconInner = React.memo(( props: propsType ) => {
    const {
        position,
        icon,
        color,
    } = props;

    const IconWrap = styled.div`
        ${StyledIconCSS}
        ${position}: 0;
        color: ${standardColorMap[ color ]}
    `;

    return (
        <IconWrap>
            <FontAwesomeIcon icon={icon} />
        </IconWrap>
    );
});

export type wrapPropsType = {
    icon: string,
    position: ?string,
    color: ?string,
};;

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
                icon={icon}
                color={color}
            />
        </ErrorCatcher>
    );
}
