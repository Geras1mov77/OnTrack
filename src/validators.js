import {
	NAV_ITEMS,
	HOURS_IN_DAY,
	MIDNIGHT_HOUR,
	BUTTON_TYPES,
} from './constants';

export function isPageValid(page) {
	return Object.keys(NAV_ITEMS).includes(page);
}

export function isButtonTypeValid(type) {
	return BUTTON_TYPES.includes(type);
}

export function validateTimeLineItems(timeLineItems) {
	return timeLineItems.every(isTimeLineItemValid);
}

export function isTimeLineItemValid({ hour }) {
	return isHourValid(hour);
}

export function validateActivities(activities) {
	return activities.every(isActivityValid);
}

export function isActivityValid(activity) {
	return isNotEmptyString(activity);
}

function isNotEmptyString(value) {
	isString(value) && value.length > 0;
}

export function isHourValid(hour) {
	return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1);
}

export function validateSelectOptions(options) {
	return options.every(isSelectOptionValid);
}

export function isUndefinedOrNull(value) {
	return isUndefined(value) || isNull(value);
}

export function isNumberOrNull(value) {
	return isNumber(value) || isNull(value);
}
export function isUndefined(value) {
	return value === undefined;
}

function isSelectOptionValid({ value, label }) {
	return isNumber(value) && isNotEmptyString(label);
}

function isNumber(value) {
	return typeof value === 'number';
}
function isBetween(value, start, end) {
	value >= start && value <= end;
}
function isNull(value) {
	return value === null;
}

function isString(value) {
	return typeof value === 'string';
}
