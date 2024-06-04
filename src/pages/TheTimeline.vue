<script setup>
import { nextTick, ref, watchPostEffect } from 'vue';
import TimeLineItem from '@/components/TimeLineItem.vue';
import {
	validateTimeLineItems,
	validateSelectOptions,
	validateActivities,
	isTimeLineItemValid,
	isActivityValid,
	isPageValid,
} from '../validators';
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants';

const props = defineProps({
	timeLineItems: {
		type: Array,
		required: true,
		validator: validateTimeLineItems,
	},
	activities: {
		type: Array,
		required: true,
		validator: validateActivities,
	},
	activitySelectOptions: {
		required: true,
		type: Array,
		validator: validateSelectOptions,
	},
	currentPage: {
		type: String,
		required: true,
		validator: isPageValid,
	},
});

const emit = defineEmits({
	setTimeLineItemActivity(timeLineItem, activity) {
		return [isTimeLineItemValid(timeLineItem), isActivityValid(activity)].every(
			Boolean
		);
	},
});

const timeLineItemRefs = ref([]);

watchPostEffect(async () => {
	if (props.currentPage === PAGE_TIMELINE) {
		await nextTick();

		scrollToHour(new Date().getHours());
	}
});

function scrollToHour(hour) {
	const currentHour = hour;
	if (currentHour === MIDNIGHT_HOUR) {
		document.body.scrollIntoView();
	} else {
		timeLineItemRefs.value[currentHour - 1].$el.scrollIntoView();
	}
}
</script>

<template>
	<div class="mt-7">
		<ul>
			<TimeLineItem
				v-for="timeLineItem in timeLineItems"
				:key="timeLineItem.hour"
				:timeline-item="timeLineItem"
				:activities="activities"
				:activity-select-options="activitySelectOptions"
				ref="timeLineItemRefs"
				@scroll-to-hour="scrollToHour"
				@select-activity="emit('setTimeLineItemActivity', timeLineItem, $event)"
			/>
		</ul>
	</div>
</template>
