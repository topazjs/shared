'use strict';

import React, {
    PureComponent
} from 'react';

import {
    Button,
    Icon
} from '@blueprintjs/core';

import {
    IconNames
} from "@blueprintjs/icons";

import Swal from 'sweetalert2';

import {
    options as commonOptions,
    settings as commonSettings,
} from '../../utils/common';

import type {
    optionType,
    settingsType,
} from '../../utils/common';

export type propsType = {
    className: string,
    icon: string,
    value: string,
    onChange: Function,
    placeholder: string,
};

export const SignatureInner = ( props: propsType ) => {
    const {
        icon,
        value = Signature.settings.initialValue,
        label,
        handleSave,
        handleClear,
        setupCanvas
    } = props;

    let signatureEl;
    let saveSignatureEl = null;
    let clearSignatureEl = null;
    if ( value && value !== Signature.settings.initialValue ) {
        signatureEl = (
            <img
                src={value}
                width={400}
                height={100} />
        );
        clearSignatureEl = (
            <Button
                icon={IconNames.ERASER}
                onClick={handleClear}
                text={`Clear signature`} />
        );
    }
    else {
        signatureEl = (
            <canvas
                id={`signature-canvas`}
                className={`current-signature`}
                width={400}
                height={100}
                ref={setupCanvas} />
        );
        saveSignatureEl = (
            <Button
                icon={IconNames.KEY}
                onClick={handleSave}
                text={`Save signature`} />
        );
    }

    return (
        <div className="row">
            <div className="col-xs-12 center-xs">
                {signatureEl}
            </div>
            <div className="col-xs-12 center-xs">
                {saveSignatureEl}
                {clearSignatureEl}
            </div>
        </div>

    );
};

export default class Signature extends PureComponent <propsType> {
    static settings: settingsType = {
        ...commonSettings,
        'controlType': `Signature`,
        'initialValue': `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAABkCAYAAACoy2Z3AAADmElEQVR4Xu3VsQ0AAAjDMPr/0/yQ2exdLKTsHAECBAgQCAILGxMCBAgQIHAC4gkIECBAIAkISGIzIkCAAAEB8QMECBAgkAQEJLEZESBAgICA+AECBAgQSAICktiMCBAgQEBA/AABAgQIJAEBSWxGBAgQICAgfoAAAQIEkoCAJDYjAgQIEBAQP0CAAAECSUBAEpsRAQIECAiIHyBAgACBJCAgic2IAAECBATEDxAgQIBAEhCQxGZEgAABAgLiBwgQIEAgCQhIYjMiQIAAAQHxAwQIECCQBAQksRkRIECAgID4AQIECBBIAgKS2IwIECBAQED8AAECBAgkAQFJbEYECBAgICB+gAABAgSSgIAkNiMCBAgQEBA/QIAAAQJJQEASmxEBAgQICIgfIECAAIEkICCJzYgAAQIEBMQPECBAgEASEJDEZkSAAAECAuIHCBAgQCAJCEhiMyJAgAABAfEDBAgQIJAEBCSxGREgQICAgPgBAgQIEEgCApLYjAgQIEBAQPwAAQIECCQBAUlsRgQIECAgIH6AAAECBJKAgCQ2IwIECBAQED9AgAABAklAQBKbEQECBAgIiB8gQIAAgSQgIInNiAABAgQExA8QIECAQBIQkMRmRIAAAQIC4gcIECBAIAkISGIzIkCAAAEB8QMECBAgkAQEJLEZESBAgICA+AECBAgQSAICktiMCBAgQEBA/AABAgQIJAEBSWxGBAgQICAgfoAAAQIEkoCAJDYjAgQIEBAQP0CAAAECSUBAEpsRAQIECAiIHyBAgACBJCAgic2IAAECBATEDxAgQIBAEhCQxGZEgAABAgLiBwgQIEAgCQhIYjMiQIAAAQHxAwQIECCQBAQksRkRIECAgID4AQIECBBIAgKS2IwIECBAQED8AAECBAgkAQFJbEYECBAgICB+gAABAgSSgIAkNiMCBAgQEBA/QIAAAQJJQEASmxEBAgQICIgfIECAAIEkICCJzYgAAQIEBMQPECBAgEASEJDEZkSAAAECAuIHCBAgQCAJCEhiMyJAgAABAfEDBAgQIJAEBCSxGREgQICAgPgBAgQIEEgCApLYjAgQIEBAQPwAAQIECCQBAUlsRgQIECAgIH6AAAECBJKAgCQ2IwIECBAQED9AgAABAklAQBKbEQECBAgIiB8gQIAAgSQgIInNiAABAgQExA8QIECAQBIQkMRmRIAAAQIC4gcIECBAIAkISGIzIkCAAIEH1vEAZa2gwc4AAAAASUVORK5CYII=`,
        'dynamic': true,
        'label': `Signature`,
        'icon': IconNames.KEY
    };

    static options: optionType[] = [
        ...commonOptions,
    ];

    render () {
        const {
            handleSave,
            handleClear,
            setupCanvas,
            props,
        } = this;

        return (
            <SignatureInner
                {...props}
                handleSave={handleSave}
                handleClear={handleClear}
                setupCanvas={setupCanvas} />
        );
    }

    handleSave = () => {
        if ( !this.canvasEl ) {
            console.trace(`No canvas element to reference for signature`);
            return false;
        }

        const dataURL = this.canvasEl.toDataURL('image/png');

        if ( dataURL !== this.props.value ) {
            this.props.onChange(dataURL);
        }
    };

    handleClear = () => {
        Swal.fire(`Delete signature`, `Do you really want to remove this signature?`, `warning`, {
            'buttons': true
        }).then(response => {
           if ( response ) {
               this.props.onChange(``);
               Swal.fire(`Signature erased`);
           }
           else {
               Swal.fire(`Cancelled`);
           }
        });
    };

    setupCanvas = canvas => {
        if ( !canvas ) {
            return false;
        }

        this.canvasEl = canvas;

        // get canvas 2D context and set him correct size
        const ctx = this.canvasEl.getContext('2d');

        // last known position
        const pos = {
            'x': 0,
            'y': 0
        };

        this.canvasEl.addEventListener('mousemove', drawMouse);
        this.canvasEl.addEventListener('mousedown', setPosition);
        this.canvasEl.addEventListener('mouseenter', setPosition);

        // new position from mouse event
        function setPosition ( e ) {
            // pos.x = e.clientX;
            // pos.y = e.clientY;
            pos.x = e.offsetX;
            pos.y = e.offsetY;
        }

        function draw ( e ) {
            ctx.beginPath(); // begin

            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#333333';

            ctx.moveTo(pos.x, pos.y); // from
            setPosition(e);
            ctx.lineTo(pos.x, pos.y); // to

            ctx.stroke(); // draw it!
        }

        function drawMouse ( e ) {

            // mouse left button must be pressed
            if ( e.buttons !== 1 ) return;

            return draw(e);
        }
    };
}
