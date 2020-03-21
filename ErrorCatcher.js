'use strict';
/* @flow */

import React, {
    PureComponent,
} from 'react';

import hoistStatics from 'hoist-non-react-statics';
import styled from 'styled-components';
import { Notice } from './Notice';
import { ERROR } from './info/intentions';

export type propsType = {
    children: ?any,
    title: ?string,
    message: ?string,
};

export type stateType = {
    error: ?string,
    info: ?Object
};

export const ErrorDetails = styled.details`
    margin-top: 4px;
    white-space: pre-wrap;
    font-style: italic;
    font-family: Operator Mono Medium, Dank mono, Ubuntu mono, helvetica neue, helvetica, arial, monospace;
`;

export class ErrorCatcher extends PureComponent<propsType, stateType> {
    state = {
        'error': null,
        'info': null,
    };

    componentDidCatch ( error, info ) {
        this.setState({
            error,
            info,
        });
    }

    render () {
        const {
            props,
            state,
        } = this;

        const {
            children,
            title = `Render error`,
            message = `Failed to render this element`,
        } = props;

        const {
            error,
            info,
        } = state;

        if ( error !== null ) {
            console.error(error);

            // Straight from the react docs cuz why not.

            return (
                <Notice
                    type={ERROR}
                    title={title}
                    message={message}>
                    <ErrorDetails>
                        {error && error.toString()}
                        <hr />
                        {info.componentStack}
                    </ErrorDetails>
                </Notice>
            );
        }

        return children;
    }
}

export const getDisplayName = WrappedComponent => (
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    `Component`
);

export const withErrorCatcher = Component => {
    const WithErrorCatcher = function ( props ) {
        return (
            <ErrorCatcher>
                <Component {...props} />
            </ErrorCatcher>
        );
    };

    WithErrorCatcher.displayName = `WithErrorCatcher(${getDisplayName(Component)})`;

    return hoistStatics(WithErrorCatcher, Component);
};
