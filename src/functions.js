import { isPageValid, isNull } from './validators';
import {
	PAGE_TIMELINE,
	HOURS_IN_DAY,
	SECONDS_IN_HOUR,
	MINUTES_IN_HOUR,
	SECONDS_IN_MINUTE,
	MILLISECONDS_IN_SECOND,
} from './constants';

export function formatSeconds(seconds) {
	const date = new Date();

	date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND);

	const utc = date.toUTCString();

	return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
}

export function normalizePageHash() {
	const page = window.location.hash.slice(1);

	if (isPageValid(page)) {
		return page;
	}
	window.location.hash = PAGE_TIMELINE;
	return PAGE_TIMELINE;
}

export function normalizeSelectValue(value) {
	return isNull(value) || isNaN(value) ? value : +value;
}

export function generateActivities() {
	return ['Coding', 'Training', 'Reading'].map((name, hours) => ({
		id: id(),
		name,
		secondsToComplete: hours * SECONDS_IN_HOUR,
	}));
}

export function id() {
	return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function generateTimelineItems(activities) {
	return [...Array(HOURS_IN_DAY).keys()].map(hour => ({
		hour,
		activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
		activitySeconds:
			hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR,
	}));
}

export function generateActivitySelectOptions(activities) {
	return activities.map(activity => ({
		value: activity.id,
		label: activity.name,
	}));
}

export function generatePeriodSelectOptions(periodInMunutes) {
	return periodInMunutes.map(periodInMunutes => ({
		value: periodInMunutes * SECONDS_IN_MINUTE,
		label: generatePeriodSelectOptionsLabel(periodInMunutes),
	}));
}

function generatePeriodSelectOptionsLabel(periodInMunutes) {
	const hours = Math.floor(periodInMunutes / MINUTES_IN_HOUR)
		.toString()
		.padStart(2, 0);
	const minutes = (periodInMunutes % MINUTES_IN_HOUR).toString().padStart(2, 0);

	return `${hours}:${minutes}`;
}
