'use strict';
/* @flow */

import React from 'react';
import styled, { css } from 'styled-components';

import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

import {
    faInfoCircle,
    faExclamationCircle,
    faExclamationTriangle,
    faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'

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

export type propsType = {
    inverted: ?boolean,
    message: string,
    type: string,
    title: ?string,
    children: ?any,
};

export default React.memo(function Notice ( props: propsType ) {
    const {
        message = `No message but there was an error - check console`,
        title = ``,
        type,
        children,
        inverted = false,
    } = props;

    let textColor = textColorMap[ type ];
    // let titleColor = titleColorMap[ type ];
    let titleCSS = css`
        color: ${titleColorMap[ type ]};
    `;
    let containerCSS = css`
        background-color: transparent;
        border-color: ${titleColorMap[ type ]};
    `;
    // let borderColor = textColorMap.plain;

    if ( inverted === true ) {
        containerCSS = cssInverts.container(type);
        // borderColor = titleColor;
        textColor = titleColorMap.light;
        // titleColor = cssInverts.title(type);
        titleCSS = cssInverts.title(type);
    }

    const NoticeFieldset = styled.fieldset`
        ${containerCSS}
        max-width: 75%;
        width: auto;
        font-family: Operator Mono Medium, Dank mono, Ubuntu mono, helvetica neue, helvetica, arial, monospace;
    `;

    const NoticeWrap = styled.div`
        display: flex;
        align-items: start;
        padding: 4px 0;
    `;

    const NoticeTitle = styled.legend`
        ${titleCSS}
        margin-bottom: 2px;
        font-size: 36px;
        font-weight: 700;
        font-family: Ubuntu, Helvetica neue, Helvetica, Arial, monospace;
    `;

    const NoticeIconWrap = styled.div`
        background: transparent;
        color: ${textColor};
        display: flex;
        flex-direction: column;
        font-size: 24px;
        border-radius: 6px;
        padding: 4px;
        margin-right: 3px;
        margin-left: 3px;
    `;

    const NoticeText = styled.code`
        color: ${textColor};
        font-size: 24px;
        font-style: italic;
        font-family: Operator Mono Medium, Dank mono, Ubuntu mono, helvetica neue, helvetica, arial, monospace;
    `;

    return (
        <NoticeFieldset>
            <NoticeTitle>{title}</NoticeTitle>
            <div>
                <NoticeWrap>
                    <NoticeIconWrap>
                        <FontAwesomeIcon icon={typeIcons[ type ]} />
                    </NoticeIconWrap>
                    <div>
                        <NoticeText>
                            {message}
                        </NoticeText>
                        {children}
                    </div>
                </NoticeWrap>
            </div>
        </NoticeFieldset>
    );
});
