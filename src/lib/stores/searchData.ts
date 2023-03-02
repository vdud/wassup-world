import { writable } from 'svelte/store';

export const searchData = writable({
	searchUserData: [],
	searchGroupData: [],
});
