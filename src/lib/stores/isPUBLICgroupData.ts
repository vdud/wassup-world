import { writable } from 'svelte/store'

export const isPUBLICgroupData = writable({
	allUsers: [],
	name: '',
	_id: '',
})
