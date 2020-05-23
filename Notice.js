'use strict';
/* @flow */

import React from 'react';

import type {
    ReactNode
} from 'react';

import styled, { css } from 'styled-components';
import memoize from 'fast-memoize';

import type {
    css as cssType,
    StyledComponent,
} from 'styled-components';

import {
    FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';

import type {
    IconDefinition,
} from '@fortawesome/fontawesome-common-types';

import {
    iconMap,
    standardColorMap,
    darkerColorMap,
} from './info/colors';

import * as Intentions from './info/intentions';

export const cssInverts = {
    "title": memoize(type =>
        css`
            color: ${standardColorMap.LIGHT};
            text-shadow: 1px 1px 0 ${darkerColorMap[ type ]}, -1px -1px 0 ${darkerColorMap[ type ]}, 
                1px 0px 1px ${darkerColorMap[ type ]}, 0px -1px 1px ${darkerColorMap[ type ]}, 
                -1px 1px 0px ${darkerColorMap[ type ]}, 1px -1px 0px ${darkerColorMap[ type ]};
        `),
    "text": memoize(() =>
        css`
            color: ${darkerColorMap.LIGHT};
        `),
    "container": memoize(type =>
        css`
            background-color: ${standardColorMap[ type ]};
            border-color: ${darkerColorMap[ type ]};
            color: ${standardColorMap.LIGHT};
        `),
};

export type fieldsetType = ({
    containerCSS: cssType,
    children: React$Node[]
}) => StyledComponent;

export const NoticeFieldset: fieldsetType = React.memo(styled.fieldset`
    ${( { containerCSS } ) => containerCSS}
    // max-width: 75%;
    width: auto;
    font-family: Operator Mono Medium, Dank mono, Ubuntu mono, helvetica neue, helvetica, arial, monospace;
`);

export type wrapType = ( {
    children: React$Node[]
} ) => StyledComponent;

export const NoticeWrap: wrapType = React.memo(styled.div`
    display: flex;
    align-items: start;
    padding: 4px 0;
`);

export type titleType = ( {
    titleCSS: cssType,
    children: string,
} ) => StyledComponent;

export const NoticeTitle: titleType = React.memo(styled.legend`
    ${( { titleCSS } ) => titleCSS}
    margin-bottom: 2px;
    font-size: 36px;
    font-weight: 700;
    font-family: Ubuntu, Helvetica neue, Helvetica, Arial, monospace;
`);

export type iconWrapType = ( {
    textColor: string,
    children: React$Component<FontAwesomeIcon>,
} ) => StyledComponent;

export const NoticeIconWrap: iconWrapType = React.memo(styled.div`
    color: ${( { textColor } ) => textColor};
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 24px;
    border-radius: 6px;
    padding: 4px;
    margin-right: 3px;
    margin-left: 3px;
`);

export type textType = ( {
    textColor: string,
    children: string,
} ) => StyledComponent;

export const NoticeText: textType = React.memo(styled.code`
    color: ${( { textColor } ) => textColor};
    font-size: 24px;
    font-style: italic;
    font-family: Operator Mono Medium, Dank mono, Ubuntu mono, helvetica neue, helvetica, arial, monospace;
`);

export type getColorsType = ( string, boolean ) => ({
    textColor: string,
    titleCSS: cssType,
    containerCSS: cssType,
    icon: IconDefinition,
});

export const getColors: getColorsType = memoize(function getColors ( type, inverted ) {
    let icon = iconMap[ type ];
    let textColor = standardColorMap[ type ];
    let titleCSS = css`
        color: ${darkerColorMap[ type ]};
    `;
    let containerCSS = css`
        background-color: transparent;
        border-color: ${darkerColorMap[ type ]};
    `;

    if ( inverted === true ) {
        textColor = darkerColorMap.LIGHT;
        titleCSS = cssInverts.title(type);
        containerCSS = cssInverts.container(type);
    }

    return {
        icon,
        textColor,
        titleCSS,
        containerCSS,
    };
});

export type propsType = {
    inverted: ?boolean,
    message: string|ReactNode,
    type: string,
    title: ?string,
    children: ?any,
};

export function Notice ( props: propsType ) {
    const {
        message,
        title,
        type,
        children,
        inverted = false,
    } = props;

    if ( !type || !Intentions[ type ] ) {
        throw new Error(`An invalid type of ${type} was passed to the Notice component - see info/intentions for a list of valid options`);
    }

    const {
        icon,
        textColor,
        titleCSS,
        containerCSS,
    } = getColors(type, inverted);

    return (
        <NoticeFieldset containerCSS={containerCSS}>
            <NoticeTitle titleCSS={titleCSS}>
                {title}
            </NoticeTitle>
            <div>
                <NoticeWrap>
                    <NoticeIconWrap
                        textColor={textColor}>
                        <FontAwesomeIcon
                            icon={icon} />
                    </NoticeIconWrap>
                    <div>
                        <NoticeText textColor={textColor}>
                            {message}
                        </NoticeText>
                        {children}
                    </div>
                </NoticeWrap>
            </div>
        </NoticeFieldset>
    );
}
