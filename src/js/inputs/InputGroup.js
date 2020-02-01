'use strict';
/* @flow */

import { IconNames } from '@blueprintjs/icons';
import React, { PureComponent } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import ErrorCatcher from '../shared/ErrorCatcher';

import {
    settings as commonSettings,
} from '../common';

export type propsType = {
    value: string,
    size: string,
};

export const ControlGroupInner = ( _props: propsType ) => {
    const {
        children,
        innerRef,
        setGroup,
        id,
        active,
        ...props
    } = _props;

    const activeClass = active
        ? `tw-bg-yellow-lighter`
        : ``;

    return (
        <div
            {...props}
            ref={innerRef}
            onClick={e => {
                setGroup(id);
                // e.stopPropagation();
                // if ( e.target !== e.currentTarget && !active ) {
                //     setGroup(id);
                //     e.stopPropagation();
                // }
            }}
            className={`${activeClass} tw-w-full tw-h-full tw-border tw-text-grey tw-p-4`}>
            {children}
        </div>
    );

};

export default class InputGroup extends PureComponent {
    render () {
        const {
            children,
            ...props
        } = this.props;

        return (
            <ErrorCatcher>

                <Droppable droppableId={props.id}>
                    {( provided ) => (

                    <ControlGroupInner
                        {...provided.droppableProps}
                        innerRef={provided.innerRef}
                        id={props.id}
                        setGroup={props.setGroup}
                        active={props.active}>
                        {children}
                    </ControlGroupInner>

                    )}
                </Droppable>
            </ErrorCatcher>
        );
    }
};

InputGroup.settings = {
    ...commonSettings,
    'controlType': `ControlGroup`,
    'dynamic': false,
    'label': `Group`,
    'icon': IconNames.CONTROL,
};
