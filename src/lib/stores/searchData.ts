import { writable } from 'svelte/store'

export const searchData = writable({
	searchUserData: [{ name: 'No User Found', _id: '0' }],
	searchGroupData: [{ name: 'No Group Found', _id: '0' }],
})
