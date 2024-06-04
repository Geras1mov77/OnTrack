<script setup>
import { ref, computed } from 'vue';
import {
	normalizePageHash,
	generateTimelineItems,
	generateActivitySelectOptions,
	generateActivities,
} from './functions';
import TheHeader from './components/TheHeader.vue';
import TheNav from './components/TheNav.vue';
import TheTimeline from './pages/TheTimeline.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants';

const currentPage = ref(normalizePageHash());

const activities = ref(generateActivities());

const timeLineItems = ref(generateTimelineItems(activities.value));

const activitySelectOptions = computed(() =>
	generateActivitySelectOptions(activities.value)
);

function goTo(page) {
	currentPage.value = page;
}

function deleteActivity(activity) {
	timeLineItems.value.forEach(timeLineItem => {
		if (timeLineItem.activityId === activity.id) {
			timeLineItem.activityId = null;
			timeLineItem.activitySeconds = 0;
		}
	});

	activities.value.splice(activities.value.indexOf(activity), 1);
}

function createActivity(activity) {
	activities.value.push(activity);
}

function setTimeLineItemAcivity(timeLineItem, activity) {
	timeLineItem.activityId = activity.id;
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
	activity.secondsToComplete = secondsToComplete;
}
</script>

<template>
	<TheHeader @navigate="goTo($event)" />

	<main class="flex flex-grow flex-col">
		<TheTimeline
			v-show="currentPage === PAGE_TIMELINE"
			:activities="activities"
			:time-line-items="timeLineItems"
			:activity-select-options="activitySelectOptions"
			:current-page="currentPage"
			@set-time-line-item-activity="setTimeLineItemAcivity"
		/>
		<TheActivities
			v-show="currentPage === PAGE_ACTIVITIES"
			:activities="activities"
			@create-activity="createActivity"
			@deleteActivity="deleteActivity"
			@set-activity-seconds-to-complete="setActivitySecondsToComplete"
		/>
		<TheProgress v-show="currentPage === PAGE_PROGRESS" />
	</main>

	<TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>

<style scoped></style>
