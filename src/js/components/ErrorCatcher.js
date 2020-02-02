'use strict';
/* @flow */

import React, {
    PureComponent
} from 'react';

import Notice from './Notice';

export type propsType = {
    children: ?any
};

export type stateType = {
    error: ?string,
    info: ?Object
};

export default class ErrorCatcher extends PureComponent<propsType, stateType> {
    state = {
        'error': null,
        'info': null
    };

    componentDidCatch ( error, info ) {
        this.setState({
            error,
            info
        });
    }

    render () {
        const {
            props,
            state
        } = this;

        const {
            children
        } = props;

        const {
            error,
            info
        } = state;

        if ( error !== null ) {
            console.trace(info);
            console.error(error);

            return (
                <Notice
                    type={`error`}
                    title={`Render error`}
                    message={`Failed to render this element - see console`} />
            );
        }

        return children;
    }
}
