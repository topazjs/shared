'use strict';

import React from 'react';

import {
    t,
} from '../../../data/state';

export const NextButton = props => (
    <button
        className={`tw-px-4 tw-text-2xl tw-bg-secondary tw-text-white tw-rounded`}
        type="submit">
        <i className={`tw-py-3 tw-px-2 fa fa-chevron-right`} /> {t(`kiosk.buttons.next`)}
    </button>
);

export const PreviousButton = ( props ) => (
    <button
        type="button"
        className={`tw-px-4 tw-text-2xl ${props.disabled ? 'tw-invisible' : ''}`}
        {...props}>
        {t(`kiosk.buttons.previous`)} <i className={`tw-py-3 tw-px-2 fa fa-chevron-left`} />
    </button>
);

const submitText = (
    <React.Fragment>
        <i className={`tw-py-3 tw-px-2 fa fa-check-circle`} /> {t(`kiosk.buttons.submit`)}
    </React.Fragment>
);

export const SubmitButton = props => (
    <button
        type={`submit`}
        className={`tw-px-4 tw-text-2xl tw-bg-green tw-text-white tw-rounded`}
        onClick={props.handleClick}>
        {!props.submitting
            ? submitText
            : <i className={`tw-py-3 tw-px-2 fa fa-spinner spinner-icon tw-text-orange`} />
        }
    </button>
);
