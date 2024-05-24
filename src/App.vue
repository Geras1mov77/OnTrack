<script setup>
import { ref, watch } from 'vue';
import {
	id,
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

const timeLineItems = generateTimelineItems();

const activities = ref(generateActivities());

const activitySelectOptions = generateActivitySelectOptions(activities.value);

function goTo(page) {
	currentPage.value = page;
}

function deleteActivity(activity) {
	activities.value.splice(activities.value.indexOf(activity), 1);
}

function createActivity(name) {
	activities.value.push({
		id: id(),
		name,
		secondsToComplete: 0,
	});
}
</script>

<template>
	<TheHeader @navigate="goTo($event)" />

	<main class="flex flex-grow flex-col">
		<TheTimeline
			v-show="currentPage === PAGE_TIMELINE"
			:time-line-items="timeLineItems"
			:activity-select-options="activitySelectOptions"
		/>
		<TheActivities
			v-show="currentPage === PAGE_ACTIVITIES"
			:activities="activities"
			@create-activity="createActivity"
			@deleteActivity="deleteActivity"
		/>
		<TheProgress v-show="currentPage === PAGE_PROGRESS" />
	</main>

	<TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>

<style scoped></style>
