import { success } from '$lib/pusher'
import { writable } from 'svelte/store'

export const loginResponseData = writable({
	success: false,
	data: {
		name: 'string',
		formatedPUBLICdata: [
			{
				name: 'string',
				latestMessage: 'string',
				nature: 'string',
				updatedAt: 0,
			},
		],
		formatedHASHTAGSdata: [
			{
				name: 'string',
				latestMessage: 'string',
				nature: 'string',
				updatedAt: 0,
			},
		],
		formatedLOCdata: [
			{
				name: 'string',
				latestMessage: 'string',
				nature: 'string',
				updatedAt: 0,
			},
		],
	},
})
