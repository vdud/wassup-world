import { writable } from 'svelte/store'

export const currentGroupData = writable({ data: { success: false } })
