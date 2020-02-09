'use strict';
/* @flow */

import React from 'react';
import styled, { css } from 'styled-components';

import type {
    css as cssType,
} from 'styled-components';

import {
    FontAwesomeIcon,
} from '@fortawesome/react-fontawesome'

import type {
    IconDefinition,
} from '@fortawesome/fontawesome-common-types';

import {
    iconMap,
    standardColorMap,
    darkerColorMap,
} from '../info/colors';

import * as Intentions from '../info/intentions';

export const cssInverts = {
    title: type =>
        css`
            color: ${standardColorMap.LIGHT};
            text-shadow: 1px 1px 0 ${darkerColorMap[ type ]}, -1px -1px 0 ${darkerColorMap[ type ]}, 
                1px 0px 1px ${darkerColorMap[ type ]}, 0px -1px 1px ${darkerColorMap[ type ]}, 
                -1px 1px 0px ${darkerColorMap[ type ]}, 1px -1px 0px ${darkerColorMap[ type ]};
        `,
    text: type =>
        css`
            color: ${darkerColorMap.LIGHT};
        `,
    container: type =>
        css`
            background-color: ${standardColorMap[ type ]};
            border-color: ${darkerColorMap[ type ]};
            color: ${standardColorMap.LIGHT};
        `,
};

export type fieldsetType = ({
    containerCSS: cssType,
    children: React$Node | React$Node[]
}) => React$Node;

export const NoticeFieldset: fieldsetType = React.memo(function NoticeFieldset ({ containerCSS, children, }) {
    const Fieldset = styled.fieldset`
        ${containerCSS}
        max-width: 75%;
        width: auto;
        font-family: Operator Mono Medium, Dank mono, Ubuntu mono, helvetica neue, helvetica, arial, monospace;
    `;

    return (
        <Fieldset>
            {children}
        </Fieldset>
    );
});

export type wrapType = ( {
    children: React$Node|React$Node[]
} ) => React$Node;

export const NoticeWrap: wrapType = React.memo(function NoticeWrap ({ children }) {
    const Wrap = styled.div`
        display: flex;
        align-items: start;
        padding: 4px 0;
    `;

    return (
        <Wrap>
            {children}
        </Wrap>
    );
});

export type titleType = ( {
    titleCSS: cssType,
    children: React$Node | React$Node[]
} ) => React$Node;

export const NoticeTitle: titleType = React.memo(function NoticeTitle ( { titleCSS, children } ) {
    const Title = styled.legend`
        ${titleCSS}
        margin-bottom: 2px;
        font-size: 36px;
        font-weight: 700;
        font-family: Ubuntu, Helvetica neue, Helvetica, Arial, monospace;
    `;

    return (
        <Title>
            {children}
        </Title>
    );
});

export type iconWrapType = ( {
    textColor: string,
    icon: IconDefinition,
} ) => React$Node;

export const NoticeIconWrap: iconWrapType = React.memo(function NoticeIconWrap ( { textColor, icon } ) {
    const IconWrap = styled.div`
        color: ${textColor};
        background: transparent;
        display: flex;
        flex-direction: column;
        font-size: 24px;
        border-radius: 6px;
        padding: 4px;
        margin-right: 3px;
        margin-left: 3px;
    `;

    return (
        <IconWrap>
            <FontAwesomeIcon icon={icon} />
        </IconWrap>
    );
});

export type textType = ( {
    textColor: string,
    children: React$Node | React$Node[]
} ) => React$Node;

export const NoticeText: textType = React.memo(function NoticeText ( { textColor, children } ) {
    const Text = styled.code`
        color: ${textColor};
        font-size: 24px;
        font-style: italic;
        font-family: Operator Mono Medium, Dank mono, Ubuntu mono, helvetica neue, helvetica, arial, monospace;
    `;

    return (
        <Text>
            {children}
        </Text>
    );
});

export type getColorsType = ( string, boolean ) => ({
    textColor: string,
    titleCSS: cssType,
    containerCSS: cssType,
    icon: IconDefinition,
});

export const getColors: getColorsType = ( type, inverted ) => {
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
};

export type propsType = {
    inverted: ?boolean,
    message: string,
    type: string,
    title: ?string,
    children: ?any,
};

export default function Notice ( props: propsType ) {
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
                        textColor={textColor}
                        icon={icon} />
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
};
