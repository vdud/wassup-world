import { writable } from 'svelte/store';

export const searchData = writable(
    {
        success: false,
        groupList: [],
        userList: []
    }
);