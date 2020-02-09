'use strict';
/* @flow */

/*******
 * These are just a bunch of helper functions, etc I've accumulated over time and use
 * in different projects.
 *
 * Don't actually think I'm using in this project either just want it somewhere I can
 * get to easily.
 *******/

import {
    Map,
    OrderedSet
} from 'immutable';

import {
    observable
} from "mobx";

import memoize from 'fast-memoize';
import moment from 'moment-timezone';

export const notEmptyStr = value => (
    typeof value === 'string' && value.trim()
);

export const dateFormatter = ( value ) => {
    return notEmptyStr(value)
        ? moment(value).format(`L`)
        : ``;
};

export const dateTimeFormatter = ( value, timezone ) => {
    return notEmptyStr(value)
        ? moment.tz(value, timezone).format('L LT z')
        : '';
};

export const parseJSON = data => {
    // Only want populated strings or non-null objects.
    if ( data ) {
        if ( typeof data === 'string' ) {
            try {
                return JSON.parse(data);
            }
            catch ( e ) {
            }
        }
        if ( typeof data === 'object' ) {
            return data;
        }
    }
    return [];
};

export const noOp = () => {};


/**
 * Drag and drop
 *  - Column re-ordering
 */

export const columnSource = {
    beginDrag ( props ) {
        return {
            [FIELD_CODE]: props.field_code,
            'index': props.index
        };
    }
};

export const columnTarget = {
    hover ( props, monitor, component ) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if ( dragIndex === hoverIndex ) {
            return;
        }

        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get horizontal tenth amount
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 10;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Only perform the move when the mouse has crossed half of the items width
        // When dragging backwards, only move when the cursor is past 90%
        // When dragging forwards, only move when the cursor is past 10%

        // Get pixels from the right edge
        const hoverClientXRight = clientOffset.x - hoverBoundingRect.right;

        // Dragging forwards
        if ( dragIndex > hoverIndex && hoverClientXRight > hoverMiddleX ) {
            return;
        }

        // Get pixels from the left edge
        const hoverClientXLeft = clientOffset.x - hoverBoundingRect.left;

        // Dragging backwards
        if ( dragIndex < hoverIndex && hoverClientXLeft < hoverMiddleX ) {
            return;
        }

        props.moveColumn(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    }
};

export const emptyStyle = {};

export const host = window.location.host;

export const protocol = window.location.protocol;

export const baseUrl = `${protocol}//${host}`;

export const sorter = ( field = `id`, ascending = true ) => {
    const ascNumber = ascending
        ? 1
        : -1;

    return ( first, second ) => {
        const a = first[ field ];
        const b = second[ field ];

        if ( a < b ) {
            return -ascNumber;
        }

        if ( a > b ) {
            return ascNumber;
        }

        return 0;
    };
};

export const textLowerSort = field =>
    ( { [field]: a }, { [field]: b } ) => {
        const lowerA = a.toLowerCase();
        const lowerB = b.toLowerCase();

        if ( lowerA < lowerB ) {
            return -1;
        }
        if ( lowerA > lowerB ) {
            return 1;
        }
        return 0;
    };

export const themeMap = {
    'default': `light`,
    'dark': `dark`,
    'light': `light`
};

export const fileTypeIconMap = {
    'pdf': `file pdf outline`,

    'docx': `file word outline`,
    'doc': `file word outline`,

    'jpg': `file image outline`,
    'jpeg': `file image outline`,
    'png': `file image outline`,
    'gif': `file image outline`,

    'unknown': `file outline`
};

const byteSized = [
    `B`,
    `KB`,
    `MB`,
    `GB`,
    `TB`
    // Anything past this and we're doing something wrong
];

const finalByteType = byteSized.length;

export const convertBytesToString = ( bytes = 0 ) => {
    let number = parseFloat(bytes).toFixed(1);
    let i = 0;

    while ( number > 1024.0 ) {
        i++;
        number = parseFloat(number / 1024.0).toFixed(1);
        if ( i > finalByteType ) {
            console.log(`Excessive number gtfo`);
            return ``;
        }
    }

    if ( number === 0 && i === 0 ) {
        console.warn(`Bytes passed to string conversion total 0 - probaby wanna check that.`);
        return `0 B`;
    }

    return `${number} ${byteSized[ i ]}`;
};

export const getNewIDArray = ( newRecords = new Uint32Array(0) ) =>
    ( idArray = new Uint32Array(0) ) => {
        const currentCount = idArray.length;
        const newCount = newRecords.length;
        const total = currentCount + newCount;
        const newIDs = new Uint32Array(total);

        let i = 0;
        for ( ; i < currentCount; ++i ) {
            newIDs[ i ] = idArray[ i ];
        }

        if ( currentCount === total ) {
            return newIDs;
        }

        let a = 0;
        for ( ; a < newCount; ++i ) {
            newIDs[ i ] = newRecords[ a++ ];
        }

        return newIDs;
    };

export const getNewIDArrayObservable = ( newRecords = new Uint32Array(0) ) =>
    ( idArray = new Uint32Array(0) ) => observable(getNewIDArray(newRecords)(idArray));

export const numberizeProp = ( idProp = `id` ) => f => (
    {
        ...f,
        [ idProp ]: ~~f[ idProp ]
    }
);

export const csvStringToArray = value =>
    value
        .split(/,/)
        .reduce(( values, string ) => {
            const value = string.trim();
            if ( value ) {
                values.push(value);
            }
            return values;
        }, []);

export const csvStringToOrderedSet = value =>
    OrderedSet(csvStringToArray(value));

export const reducify = ( keyProp = `id`, displayProp = `name`, valueProp = keyProp ) =>
    ( dataMap, data ) =>
        dataMap.set(String(data[ keyProp ]), {
        ...data,
        valueProp,
        displayProp
    });

export const reducifyDeep = ( keyProp = `id`, deepKey, displayProp = `name`, valueProp = keyProp ) =>
    ( dataMap, data ) =>
        dataMap.update(
            String(data[ keyProp ]),
            ( innerMap = Map() ) =>
                innerMap.set(String(data[ deepKey ]), {
                    ...data,
                    valueProp,
                    displayProp
                })
        );

export const getSort = ( oldName, oldDirection, newName ) => {
    const sortDirection = !oldDirection || oldName !== newName
        ? `DESC`
        : oldDirection === `DESC`
            ? `ASC`
            : undefined;

    const sortField = sortDirection
        ? newName
        : undefined;

    return {
        sortField,
        sortDirection
    };
};

/*******************************
 * COLOR CONTRAST
 *
 * Calculations / special numbers ref (AAA standard used here):
 * - https://www.w3.org/TR/WCAG20-TECHS/G17.html
 *
 * For AA standard:
 * - https://www.w3.org/TR/AERT/#color-contrast
 *******************************/

export const convertHex = memoize(function ( numberStr: string ): number {
    return parseFloat(parseInt(numberStr, 16));
});

export const getRGB = memoize(function ( rgb: string ): number[] {
    const red = rgb.slice(1, 3);
    const green = rgb.slice(3, 5);
    const blue = rgb.slice(5, 7);

    return [
        convertHex(red),
        convertHex(green),
        convertHex(blue),
    ];
});

export const getCorrectedValue = memoize(function ( color: number ): number {
    const newColor = color / 255.0;

    if ( newColor <= 0.03928 ) {
        return newColor / 12.92;
    }
    return ((newColor + 0.055) / 1.055) ** 2.4;
});

export const getContrastAAA = memoize(function ( rgb: string ): number {
    const rgbArray = getRGB(rgb);

    const red = getCorrectedValue(rgbArray[ 0 ]) * 0.2126;
    const green = getCorrectedValue(rgbArray[ 1 ]) * 0.7152;
    const blue = getCorrectedValue(rgbArray[ 2 ]) * 0.0722;

    const sum = red + green + blue;

    return sum + 0.05;
    // return Math.round(sum);
});

export const black = `#000000`;
export const white = `#FFFFFF`;
export const blackLuminosity = getContrastAAA(black);
export const whiteLuminosity = getContrastAAA(white);

/**
 * Expects `rgb` to be formatted as #XXXXXX (X = A-F or 0-9)
 * @type {function(string): string}
 */
export const getForegroundColor = memoize(function ( rgb: string ): string {
    const colorLuminosity = getContrastAAA(rgb);

    // Formula for ratio is LIGHTER / DARKER
    if ( colorLuminosity / blackLuminosity > 7 ) {
        return black;
    }
    return white;
});

export const searchConditionLabelMap = Map({
    'equals': `Equals`,
    'doesNotEqual': `Does not equal`,
    'contains': `Contains`,
    'doesNotContain': `Does not contain`,
});

export const fontSizes = {
    '14': {
        'fontSize': `14px`
    },
    '16': {
        'fontSize': `16px`
    },
    '20': {
        'fontSize': `20px`
    },
    '24': {
        'fontSize': `24px`
    },
};
