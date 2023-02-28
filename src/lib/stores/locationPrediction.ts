import { writable } from 'svelte/store'

export const locationPrediction = writable([
	{
		description: '',
		structured_formatting: {
			main_text: '',
			secondary_text: '404',
		},
		types: ['NOT FOUND'],
	},
])
