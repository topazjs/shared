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

import {
    faInfoCircle,
    faExclamationCircle,
    faExclamationTriangle,
    faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'

import type {
    IconDefinition,
} from '@fortawesome/fontawesome-common-types';

export const typeIcons = {
    'plain': faInfoCircle,
    'error': faExclamationCircle,
    'info': faInfoCircle,
    'warning': faExclamationTriangle,
    'success': faCheckCircle,
};

export const textColorMap = {
    'plain': `#253137`,
    'error': `#E3342F`,
    'info': `#3490DC`,
    'warning': `#F6993F`,
    'success': `#38C172`,
    'light': `#F1F5F8`,
};

export const titleColorMap = {
    'plain': `#22292F`,
    'error': `#CC1F1A`,
    'info': `#2779BD`,
    'warning': `#DE751F`,
    'success': `#1F9D55`,
    'light': `#F1F5F8`,
};

export const cssInverts = {
    title: type =>
        css`
            color: ${textColorMap.light};
            text-shadow: 1px 1px 0 ${titleColorMap[ type ]}, -1px -1px 0 ${titleColorMap[ type ]}, 
                1px 0px 1px ${titleColorMap[ type ]}, 0px -1px 1px ${titleColorMap[ type ]}, 
                -1px 1px 0px ${titleColorMap[ type ]}, 1px -1px 0px ${titleColorMap[ type ]};
        `,
    text: type =>
        css`
            color: ${titleColorMap.light};
        `,
    container: type =>
        css`
            background-color: ${textColorMap[ type ]};
            border-color: ${titleColorMap[ type ]};
            color: ${textColorMap.light};
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
    let icon = typeIcons[ type ];
    let textColor = textColorMap[ type ];
    let titleCSS = css`
        color: ${titleColorMap[ type ]};
    `;
    let containerCSS = css`
        background-color: transparent;
        border-color: ${titleColorMap[ type ]};
    `;

    if ( inverted === true ) {
        textColor = titleColorMap.light;
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
        title = ``,
        type,
        children,
        inverted = false,
    } = props;

    if ( !message && !title && !children ) {
        throw new Error(`The Notice component needs something to display - add a message, title and/or children`);
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
