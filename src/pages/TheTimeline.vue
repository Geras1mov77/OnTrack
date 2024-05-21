<script setup>
import TimeLineItem from '@/components/TimeLineItem.vue';
import { validateTimeLineItems, validateSelectOptions } from '../validators';

defineProps({
	timeLineItems: {
		type: Array,
		required: true,
		validator: validateTimeLineItems,
	},
	activitySelectOptions: {
		required: true,
		type: Array,
		validator: validateSelectOptions,
	},
});
</script>

<template>
	<div class="mt-7">
		<ul>
			<TimeLineItem
				v-for="timeLineItem in timeLineItems"
				:key="timeLineItem.hour"
				:timeline-item="timeLineItem"
				:activity-select-options="activitySelectOptions"
			/>
		</ul>
	</div>
</template>
