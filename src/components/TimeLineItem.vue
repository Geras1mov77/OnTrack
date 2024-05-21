<script setup>
import { ref } from 'vue';
import { isTimeLineItemValid, validateSelectOptions } from '../validators';
import BaseSelect from '@/components/BaseSelect.vue';
import TimelineHour from '@/components/TimelineHour.vue';

defineProps({
	timelineItem: {
		type: Object,
		required: true,
		validator: isTimeLineItemValid,
	},
	activitySelectOptions: {
		required: true,
		type: Array,
		validator: validateSelectOptions,
	},
});

const selectedActivityId = ref(0);
</script>

<template>
	<li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
		<TimelineHour :hour="timelineItem.hour" />
		<BaseSelect
			:selected="selectedActivityId"
			:options="activitySelectOptions"
			placeholder="Rest"
			@select="selectedActivityId = $event"
		/>
	</li>
</template>
