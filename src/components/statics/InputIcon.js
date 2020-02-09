'use strict';
/* @flow */

import React from 'react';

import ErrorCatcher from '../ErrorCatcher';

export type propsType = {
    iconName: string,
    position: ?string,
    stateColor: ?string,
};

export const InputIconInner = ( props: propsType ) => {
    const {
        position = `left`,
        iconName = ``,
        color = `black`,
    } = props;

    return (
        <div className={`tw-pointer-events-none tw-absolute tw-pin-y tw-pin-${position.charAt(0)} tw-flex tw-items-center tw-px-2 tw-text-${color} tw-width-4 tw-height-4/5 tw-text-sm`}>
            <i className={`fa fa-${iconName}`} />
        </div>
    );
};

export type wrapPropsType = propsType;

export default function InputIcon ( props: wrapPropsType ) {
    return (
        <ErrorCatcher>
            <InputIconInner
                {...props} />
        </ErrorCatcher>
    );
}
