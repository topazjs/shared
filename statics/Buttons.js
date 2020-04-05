'use strict';

import { Button } from '@smooth-ui/core-sc';
import React from 'react';
import { Link } from 'react-router-dom';

import {
    t,
} from '../../../data/state';
import {
    buttonClass,
    buttonTextClass,
    largeButtonClass,
} from '../../../util/helper';

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

// const submitText = (
//     <React.Fragment>
//         <i className={`tw-py-3 tw-px-2 fa fa-check-circle`} /> {t(`kiosk.buttons.submit`)}
//     </React.Fragment>
// );
//
// export const SubmitButton = props => (
//     <button
//         type={`submit`}
//         className={`tw-px-4 tw-text-2xl tw-bg-green tw-text-white tw-rounded`}
//         onClick={props.handleClick}>
//         {!props.submitting
//             ? submitText
//             : <i className={`tw-py-3 tw-px-2 fa fa-spinner spinner-icon tw-text-orange`} />
//         }
//     </button>
// );

export function HomeButton ( props ) {
    const {
        className = ``,
    } = props;

    return (
        <Link to={`/`}>
            <button
                className={`tw-mx-auto tw-bg-info tw-text-white ${largeButtonClass} ${buttonClass} ${buttonTextClass} ${className}`}
                name={`home-button`}
                id={`home-button`}
                type={`button`}>
                Home
            </button>
        </Link>
    );
}

export function FormButtonGroup ( props ) {
    const {
        className = ``,
        hidden,
        handleReset = () => {},
    } = props;

    const conditionClasses = hidden
        ? `tw-hidden`
        : `${largeButtonClass} ${buttonClass} ${buttonTextClass}`;

    return (
        <div
            className={`tw-w-full tw-text-center`}>
            <button
                key={`submit-button-key`}
                className={`tw-w-1/3 tw-mx-2 tw-bg-primary tw-text-white ${conditionClasses} ${className}`}
                disabled={hidden}
                name={`submit-button`}
                id={`submit-button`}
                type={`submit`}>
                Save
            </button>
            <button
                key={`reset-button-key`}
                className={`tw-w-1/3 tw-mx-2 tw-bg-secondary tw-text-white ${conditionClasses} ${className}`}
                disabled={hidden}
                name={`reset-button`}
                id={`reset-button`}
                type={`reset`}
                onClick={e => handleReset()}>
                Reset
            </button>
        </div>
    )
}
