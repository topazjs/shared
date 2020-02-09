'use strict';

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import ErrorCatcher, { withErrorCatcher } from '../src/js/components/ErrorCatcher';

export default {
  title: 'Error Catcher HOC and Component',
  component: ErrorCatcher,
};

export function HOCExample () {
    function BadComponent ( props ) {
        throw new Error(`oops!`);
        return (
            <div {...props}>
                {props.children}
            </div>
        );
    }

    const SafelyWrapped = withErrorCatcher(BadComponent);

    return (
        <div>
            <h3>Errors below won't affect me</h3>
            <SafelyWrapped fakeProp={function () { return false }}>
                <span>you never let me render. :(</span>
            </SafelyWrapped>
            <pre>Or me! :)</pre>
        </div>
    );
};

export function ComponentChildrenExample () {
    function BadComponent ( props ) {
        throw new Error(`oops!`);
        return (
            <div {...props}>
                {props.children}
            </div>
        );
    }

    return (
        <div>
            <h3>Errors below won't affect me</h3>
            <ErrorCatcher>
                <BadComponent>
                    <span>like seriously what is this</span>
                </BadComponent>
                <span>you never let me render. :(</span>
            </ErrorCatcher>
            <pre>Or me! :) still!</pre>
        </div>
    );
};
