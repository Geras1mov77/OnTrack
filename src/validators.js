import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR } from './constants';

export function isPageValid(page) {
	return Object.keys(NAV_ITEMS).includes(page);
}

export function validateTimeLineItems(timeLineItems) {
	return timeLineItems.every(isTimeLineItemValid);
}

export function isTimeLineItemValid({ hour }) {
	return isHourValid(hour);
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

function isSelectOptionValid({ value, label }) {
	return isNumber(value) && isString(label);
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

function isUndefined(value) {
	return value === undefined;
}

function isString(value) {
	return typeof value === 'string';
}
