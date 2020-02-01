'use strict';
/* @flow */

import React, {
    PureComponent
} from 'react';

export type propsType = {
    onClick: Function
};

export const LoaderInner = React.memo(( props: propsType ) => {
    const {
        onClick
    } = props;

    return (
        <div
            className={`loader-container loading`}
            onClick={onClick}>
            <div className="lock-n-loader">
                <div key={`loader-sqr-key`} className="bigSqr">
                    <div key={`loader-key-first`} className="square first" />
                    <div key={`loader-key-second`} className="square second" />
                    <div key={`loader-key-third`} className="square third" />
                    <div key={`loader-key-fourth`} className="square fourth" />
                </div>
                <div key={`loader-text-key`} className="text">
                    loading...
                </div>
            </div>
        </div>
    );
});

export type wrapPropsType = propsType;

export type wrapStateType = {};

export default class Loader extends PureComponent {
    render () {
        const {
            handleClick
        } = this;

        return (
            <LoaderInner
                onClick={handleClick} />
        );
    }

    handleClick = ( event: Event ) => {
        event.preventDefault();
        event.stopPropagation();
    };
}
