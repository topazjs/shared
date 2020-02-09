'use strict';
/* @flow */

import {
    faInfoCircle,
    faExclamationCircle,
    faExclamationTriangle,
    faCheckCircle,
    faMoon,
    faStop,
} from '@fortawesome/free-solid-svg-icons';

import type {
    IconDefinition,
} from '@fortawesome/fontawesome-common-types';

export type iconMapType = {
    plain: IconDefinition,
    error: IconDefinition,
    info: IconDefinition,
    warning: IconDefinition,
    success: IconDefinition,
    light: IconDefinition,
    invalid: IconDefinition,
};

export const iconMap: iconMapType = {
    'plain': faInfoCircle,
    'error': faExclamationCircle,
    'info': faInfoCircle,
    'warning': faExclamationTriangle,
    'success': faCheckCircle,
    'light': faMoon,
    'invalid': faStop,
};

export const standardColorMap = {
    'plain': `#253137`,
    'error': `#E3342F`,
    'info': `#3490DC`,
    'warning': `#F6993F`,
    'success': `#38C172`,
    'light': `#F1F5F8`,
    'invalid': `#F66D9B`,
};

export const darkerColorMap = {
    'plain': `#22292F`,
    'error': `#CC1F1A`,
    'info': `#2779BD`,
    'warning': `#DE751F`,
    'success': `#1F9D55`,
    'light': `#F1F5F8`,
    'invalid': `#EB5286`,
};
