<script setup>
import TimeLineItem from '@/components/TimeLineItem.vue';
import { validateTimeLineItems } from '../validators';

defineProps({
	timeLineItems: {
		type: Array,
		required: true,
		validator: validateTimeLineItems,
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
			/>
		</ul>
	</div>
</template>
