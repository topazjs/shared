'use strict';

import React, {
    useEffect,
    PureComponent,
    useState,
    useCallback,
} from 'react';

import {
    withErrorCatcher,
} from './ErrorCatcher';

export const buttonClassName = `tw-block tw-appearance-none tw-w-full tw-bg-white tw-border tw-border-gray tw-px-4 tw-py-2 tw-pr-8 tw-rounded-t tw-shadow tw-leading-tight tw--outline-none`;

export const DownArrow = (
    <div className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700">
        <svg
            className="tw-fill-current tw-h-4 tw-w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
    </div>
);

function GenericMenuInner ( { name, options, clickToggler, keyDownToggler } ) {
    useEffect(() => {
        document.addEventListener(`click`, clickToggler, false);
        document.addEventListener(`keydown`, keyDownToggler, false);
        return () => {
            document.removeEventListener(`click`, clickToggler, false);
            document.removeEventListener(`keydown`, keyDownToggler, false);
        }
    }, []);

    return (
        <ul
            onClick={clickToggler}
            role="menu"
            className={`tw-rounded-b tw-border-black tw-border tw-px-2 tw-z-10 tw-absolute tw-bg-primary tw-text-white tw-w-full dropdown-menu dropdown-menu-right ${name}-menu`}>
            {options}
        </ul>
    );
}

function GenericMenu ( props ) {
    const [ opened, toggleOpen ] = useState(false);

    const clickToggler = useCallback(( event ) => {
        console.log(`click ${props.name}`);
        if ( event.target === event.currentTarget && event.target.classList.contains(`${props.name}-menu`) ) {
            event.preventDefault();
            event.stopPropagation();
            toggleOpen(false);
        }
        else if ( !event.target.classList.contains(`${props.name}-menu-button`) ) {
            toggleOpen(false);
        }
    }, [ toggleOpen ]);

    const keyDownToggler = useCallback(event => {
        console.log(`keyd ${props.name}`);
        if ( event.which === 27 ) {
            event.preventDefault();
            event.stopPropagation();

            toggleOpen(false);
        }
    }, [ toggleOpen ]);

    const handleButtonClick = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();
        toggleOpen(!opened);
    }, [ opened, toggleOpen ]);

    let menu = null;
    let openClass = ``;
    if ( opened ) {
        openClass = ` open`;
        menu = (
            <GenericMenuInner
                key={`menu-${props.name}-key`}
                name={props.name}
                options={props.options}
                width={props.width}
                value={props.value}
                clickToggler={clickToggler}
                keyDownToggler={keyDownToggler} />
        );
    }

    return (
        <div className={`tw-inline-block tw-relative tw-w-${props.width} dropdown ${openClass} top-nav__icon`}>
            <button
                key={`${props.name}-menu-button-key`}
                className={`${props.name}-menu-button ${buttonClassName} ${opened ? '' : 'tw-rounded-b'}`}
                title={props.title}
                aria-hidden="true"
                onClick={handleButtonClick}
                type={`button`}
                role={`button`}>

                {props.value}

                {DownArrow}
            </button>

            {menu}
        </div>
    );
}

export default withErrorCatcher(GenericMenu);
