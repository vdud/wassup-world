import { success } from '$lib/pusher'
import { writable } from 'svelte/store'

export const loginResponseData = writable({
	success: false,
	data: {
		name: 'string',
		formatedPUBLICdata: [
			{
				name: 'string',
				lastMessage: 'string',
				nature: 'string',
				updatedAt: 0,
				latestMessageSender: 'string',
			},
		],
		formatedHASHTAGSdata: [
			{
				name: 'string',
				lastMessage: 'string',
				nature: 'string',
				updatedAt: 0,
				latestMessageSender: 'string',
			},
		],
		formatedLOCdata: [
			{
				name: 'string',
				lastMessage: 'string',
				nature: 'string',
				updatedAt: 0,
				latestMessageSender: 'string',
			},
		],
	},
})
