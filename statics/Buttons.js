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

export function FormButtonGroup ( props ) {
    const {
        className,
        disabled,
        handleReset = () => {},
    } = props;

    return (
        <div
            className={`tw-w-full tw-text-center`}
            key={`buttons-group-wrap-key`}>
            <Button
                key={`submit-button-key`}
                variant={`primary`}
                className={`tw-w-1/3 tw-mx-2 ${className}`}
                disabled={disabled}
                name={`submit-button`}
                id={`submit-button`}
                type={`submit`}>
                Save
            </Button>
            <Button
                key={`reset-button-key`}
                variant={`secondary`}
                className={`tw-w-1/3 tw-mx-2 ${className}`}
                disabled={disabled}
                name={`reset-button`}
                id={`reset-button`}
                type={`button`}
                onClick={handleReset}>
                Reset
            </Button>
            <div
                className={`tw-w-full tw-text-center`}
                key={`home-button-group-wrap-key`}>
                <Link to={`/home`}>
                    <Button
                        key={`home-button-key`}
                        variant={`info`}
                        className={`tw-w-1/5 tw-mx-auto ${className}`}
                        name={`home-button`}
                        id={`home-button`}
                        type={`button`}>
                        Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}
