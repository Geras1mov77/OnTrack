<script setup>
import { ref } from 'vue';
import { isTimeLineItemValid } from '../validators';
import BaseSelect from '@/components/BaseSelect.vue';
import TimelineHour from '@/components/TimelineHour.vue';

defineProps({
	timelineItem: {
		type: Object,
		required: true,
		validator: isTimeLineItemValid,
	},
});

const options = [
	{ value: 1, label: 'Coding' },
	{ value: 2, label: 'Reading' },
	{ value: 3, label: 'Training' },
];

const selectedActivityId = ref(1);
</script>

<template>
	<li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
		<TimelineHour :hour="timelineItem.hour" />
		<BaseSelect
			:selected="selectedActivityId"
			:options="options"
			placeholder="Rest"
			@select="selectedActivityId = $event"
		/>
	</li>
</template>
