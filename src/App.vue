<script setup>
import { ref } from 'vue';
import {
	normalizePageHash,
	generateTimelineItems,
	generateActivitySelectOptions,
} from './functions';
import TheHeader from './components/TheHeader.vue';
import TheNav from './components/TheNav.vue';
import TheTimeline from './pages/TheTimeline.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants';

const currentPage = ref(normalizePageHash());

const timeLineItems = generateTimelineItems();

const activities = ['Coding', 'Reading', 'Training'];

const activitySelectOptions = generateActivitySelectOptions(activities);

function goTo(page) {
	currentPage.value = page;
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
		/>
		<TheProgress v-show="currentPage === PAGE_PROGRESS" />
	</main>

	<TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>

<style scoped></style>
