'use strict';
/* @flow */

import React, {
    PureComponent
} from 'react';

import Color from 'color';

import ErrorCatcher from './ErrorCatcher';

export type innerPropsType = {
    children: ?any,
    className: ?string,
    color: ?string,
    text: ?string,
    title: ?string
};

export const TagInner = ( props: innerPropsType ) => {
    const {
        children,
        className = ``,
        color = ``,
        title = ``
    } = props;

    return (
        <div
            className={`${Tag.defaultClasses.tag} tw-text-${color} ${className}`}
            title={title}>
            {children}
        </div>
    );
};

export type propsType = {
    children: ?any,
    className: ?string,
    color: ?string,
    icon: ?string,
    text: ?string
};

export default class Tag extends PureComponent<propsType> {
    static defaultClasses = {
        'tag': `tag tw-flex tw-items-center`,
        'text': `tag__text tw-mx-1 tw-text-md`,
        'icon': `tag__icon tw-px-2 tw-py-1 tw-mx-1 tw-text-lg`,
    };

    static makeStyles = ( backgroundColor = `#232323` ) => ({
        backgroundColor,
        // 'color': (new Color(backgroundColor)).isDark()
        //     ? `#EAEAEA`
        //     : `#232323`
    });

    static Icon = props => {
        const {
            className = ``,
            color = `grey-dark`,
            icon,
            title = ``
        } = props;

        if ( !icon ) {
            return null;
        }

        return (
            <span
                title={title}
                className={`${Tag.defaultClasses.icon} tw-text-${color} ${className}`}>
                <i className={`fa fa-${icon}`} />
            </span>
        );
    };

    static Text = props => {
        const {
            className = ``,
            color = ``,
            text
        } = props;

        if ( !text ) {
            return null;
        }

        if ( color ) {
            if ( color.charAt(0) === `#` ) {
                const colorObj = new Color(color);
                if ( colorObj ) {
                    const styles = Tag.makeStyles(color);
                    const textClass = colorObj.saturationl() > 50.0 || colorObj.luminosity() < 0.25
                        ? `tw-text-grey-light`
                        : `tw-text-grey-dark`;

                    return (
                        <span
                            className={`${Tag.defaultClasses.text} ${textClass} ${className}`}
                            style={styles}>
                            {text}
                        </span>
                    );
                }
            }
            else {
                return (
                    <span className={`${Tag.defaultClasses.text} tw-text-${color} ${className}`}>
                        {text}
                    </span>
                );
            }
        }

        return (
            <span className={`${Tag.defaultClasses.text} tw-text-grey-light ${className}`}>
                {text}
            </span>
        );
    };

    render () {
        const {
            props,
        } = this;

        const {
            children,
            className = ``,
            color,
            icon,
            text,
            title
        } = props;

        return (
            <ErrorCatcher>
                <TagInner
                    className={className}
                    color={color}
                    text={text}
                    title={title}>
                    <Tag.Icon
                        key={`icon-key-1`}
                        color={color}
                        title={title}
                        icon={icon} />

                    <Tag.Text
                        key={`text-key-2`}
                        color={color}
                        text={text} />

                    {children}
                </TagInner>
            </ErrorCatcher>
        );
    }
}
