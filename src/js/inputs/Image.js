'use strict';
/* @flow */

import React, {
    PureComponent
} from 'react';

import {
    IconNames
} from "@blueprintjs/icons";

import {
    FileInput,
    FormGroup
} from '@blueprintjs/core';

import {
    options as commonOptions,
    settings as commonSettings,
} from '../../utils/common';

import type {
    optionType,
    settingsType,
} from '../../utils/common';

import TextInput from './TextInput';

export const ImagePreview = ({ value }) => (
    <div className={`col-xs-12 col-md-6 center-xs middle-xs control-image--preview`}>
        <img
            src={value}
            className={`control-image--preview__image`} />
    </div>
);

export type propsType = {
    className: string,
    icon: string,
    value: string,
    onChangeURL: Func,
    onChangeFile: Func,
    placeholder: string,
};

export const ImageInputInner = ( props: propsType ) => {
    const {
        id,
        children,
        className = ImageInput.settings.className,
        helpText = ImageInput.settings.helpText,
        value = ImageInput.settings.initialValue,
        required = ImageInput.settings.required,
        onChangeURL,
        onChangeFile,
        placeholder = ``,
    } = props;

    return (
        <div className="row">
            <div className="col-xs-12 col-md-6">
                <div className="col-xs-12">
                    <FormGroup
                        helperText={helpText}
                        requiredLabel={required}>
                        <input
                            id={id}
                            name={id}
                            className={TextInput.settings.className}
                            type="text"
                            dir="auto"
                            value={value && value.indexOf(/^data:image\//) > -1 ? `` : value}
                            onChange={onChangeURL}
                            placeholder={placeholder} />
                    </FormGroup>
                </div>
                <div className="col-xs-12">
                    <FileInput
                        large
                        text="Choose file..."
                        onInputChange={onChangeFile} />
                </div>
            </div>

            {children}

        </div>

    );
};

export default class ImageInput extends PureComponent <propsType> {
    static settings: settingsType = {
        ...commonSettings,
        'controlType': `Image`,
        'dynamic': false,
        'label': `Upload image`,
        'helpText': `Input to allow the user to upload an image to be viewed in this form and/or stored for later use`,
        'icon': IconNames.MEDIA,
    };

    static options: optionType[] = [
        ...commonOptions,
    ];

    render () {
        const {
            handleChangeURL,
            handleChangeFile,
            props,
        } = this;

        return (
            <ImageInputInner
                {...props}
                onChangeURL={handleChangeURL}
                onChangeFile={handleChangeFile}>
                <ImagePreview
                    value={props.value} />
            </ImageInputInner>
        );
    }

    handleChangeURL = event => {
        const {
            value = ``
        } = event.target;

        /**
         * Don't trim here - no need
         */
        const newValue = value;

        if ( newValue !== this.props.value ) {
            this.props.onChange(newValue);
        }
    };

    handleChangeFile = event => {
        const [
            file
        ] = event.target.files;

        if ( !file ) {
            console.error(`Could this ever really happen?`);
            return false;
        }

        // const fileName = file.name;
        const mimeType = file.type;
        const isImage = /^image\/(?:jpe?g|png|svg\+xml|tiff|x-ms-bmp|x-icon|webp)$/i.test(mimeType);
        // const fileSize = file.size;
        const reader = new FileReader();

        reader.onload = event => {
            const value = event.target.result;

            if ( value !== this.props.value ) {
                this.props.onChange(value);
            }
        };

        if ( file && isImage === true ) {
            reader.readAsDataURL(file);
        }
    };

    /**
     * @TODO - definitely don't do this - just gonna leave it cuz it's super early still
     */

}
