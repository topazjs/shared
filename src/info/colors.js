'use strict';
/* @flow */

import {
    faInfoCircle,
    faExclamationCircle,
    faExclamationTriangle,
    faCheckCircle,
    faMoon,
    faBan,
} from '@fortawesome/free-solid-svg-icons';

import type {
    IconDefinition,
} from '@fortawesome/fontawesome-common-types';

import * as Intentions from './intentions';

export type iconMapType = {
    [Intentions.PLAIN]: IconDefinition,
    [Intentions.ERROR]: IconDefinition,
    [Intentions.INFO]: IconDefinition,
    [Intentions.WARNING]: IconDefinition,
    [Intentions.SUCCESS]: IconDefinition,
    [Intentions.LIGHT]: IconDefinition,
    [Intentions.INVALID]: IconDefinition,
};

export const iconMap: iconMapType = {
    [Intentions.PLAIN]: faInfoCircle,
    [Intentions.ERROR]: faExclamationCircle,
    [Intentions.INFO]: faInfoCircle,
    [Intentions.WARNING]: faExclamationTriangle,
    [Intentions.SUCCESS]: faCheckCircle,
    [Intentions.LIGHT]: faMoon,
    [Intentions.INVALID]: faBan,
};

export const standardColorMap = {
    [Intentions.PLAIN]: `#253137`,
    [Intentions.ERROR]: `#E3342F`,
    [Intentions.INFO]: `#3490DC`,
    [Intentions.WARNING]: `#F6993F`,
    [Intentions.SUCCESS]: `#38C172`,
    [Intentions.LIGHT]: `#F1F5F8`,
    [Intentions.INVALID]: `#F66D9B`,
};

export const darkerColorMap = {
    [Intentions.PLAIN]: `#22292F`,
    [Intentions.ERROR]: `#CC1F1A`,
    [Intentions.INFO]: `#2779BD`,
    [Intentions.WARNING]: `#DE751F`,
    [Intentions.SUCCESS]: `#1F9D55`,
    [Intentions.LIGHT]: `#F1F5F8`,
    [Intentions.INVALID]: `#EB5286`,
};
