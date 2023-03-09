import { writable } from 'svelte/store'

export const isPUBLICgroupData = writable({
	success: false,
	allUsers: [],
	name: '',
	_id: '',
})
