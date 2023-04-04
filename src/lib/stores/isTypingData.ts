import { writable } from 'svelte/store';

export const isTypingData = writable({
	message: '',
	isTyping: false,
});
