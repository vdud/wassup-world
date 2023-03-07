<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { onMount, onDestroy } from 'svelte'
	import { json } from '@sveltejs/kit'
	import { canSendReciever } from '$lib/stores/canSendReciever'
	import { userName_id } from '$lib/stores/userName_id'
	import { canSend } from '$lib/stores/canSend'
	import { pusher } from '$lib/pusher'

	onMount(() => {
		$canSend = true
		$userGroup_id = JSON.parse(data.body.data)._id
		const bodyData = JSON.parse(data.body.data)

		pusher.subscribe(JSON.parse(data.body.data)._id).bind('inserted', (data: any) => {
			console.log(data.message)
			console.log(data)
		})
		bodyData.allUsers.forEach((user: any) => {
			console.log(user._id)
			console.log($userName_id)
			if (user._id !== $userName_id) {
				$canSendReciever = user._id
			}
		})
	})

	onDestroy(() => {
		$canSend = false
	})
</script>
