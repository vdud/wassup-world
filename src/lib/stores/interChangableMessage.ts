import { writable } from 'svelte/store';

export const interChangableMessage = writable({
	message: '',
	isTyping: false,
});
