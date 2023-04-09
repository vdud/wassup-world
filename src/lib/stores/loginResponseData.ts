import { success } from '$lib/bigFunctions/pusher';
import { writable } from 'svelte/store';

export const loginResponseData = writable({
	success: false,
	data: {
		name: 'string',
		formattedUserData_Group_ids: [
			{
				_id: 'string',
			},
		],
		formatedPUBLICdata: [
			{
				_id: 'string',
				name: 'string',
				lastMessage: 'string',
				nature: 'string',
				updatedAt: 0,
				latestMessageSender: 'string',
			},
		],
		formatedHASHTAGSdata: [
			{
				_id: 'string',
				name: 'string',
				lastMessage: 'string',
				nature: 'string',
				updatedAt: 0,
				latestMessageSender: 'string',
			},
		],
		formatedLOCdata: [
			{
				_id: 'string',
				name: 'string',
				lastMessage: 'string',
				nature: 'string',
				updatedAt: 0,
				latestMessageSender: 'string',
				Theme: 'string',
			},
		],
	},
});
