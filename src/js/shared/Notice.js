'use strict';
/* @flow */

import React from 'react';

export const typeIntents = {
    'plain': `info`,
    'error': `danger`,
    'info': `primary`,
    'warning': `warning`,
    'success': `success`,
};

export const typeIcons = {
    'plain': `info-circle`,
    'error': `exclamation-circle`,
    'info': `info-circle`,
    'warning': `exclamation-triangle`,
    'success': `check-circle`,
};

export type propsType = {
    message: string,
    type: string,
    title: ?string,
};

export const NoticeInner = React.memo(( { message, type, title }: propsType ) => {
    return (
        <div className={`tw-max-w-sm tw-w-full tw-flex`}>
            <div className={`tw-flex tw-flex-col tw-bg-${typeIntents[ type ]}-darker tw-h-auto tw-w-auto tw-text-2xl tw-rounded-l tw-p-4 tw-justify-center`}>
                <span className={`fa fa-${typeIcons[ type ]} tw-text-white`} />
            </div>
            <div className={`tw-bg-${typeIntents[ type ]}-lighter tw-text-${typeIntents[ type ]}-darker tw-border-r tw-border-b tw-border-t tw-rounded-r tw-p-4 tw-flex-col tw-justify-between tw-leading-normal`}>
                <div className="tw-ml-8">
                    <div className="tw-font-bold tw-text-xl tw-mb-2">{title}</div>
                    <p className="tw-text-gray-700 tw-text-base">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
});

export type wrapPropsType = {
    message: string,
    title: ?string,
    type: string
};

export default function Notice ( props: wrapPropsType ) {
    const {
        message = `No message but there was an error - check console`,
        title = ``,
        type
    } = props;

    return (
        <NoticeInner
            title={title}
            type={type}
            message={message} />
    );
}
