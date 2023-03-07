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
	import { currentPage } from '$lib/stores/currentPage'
	import { userName } from '$lib/stores/userName'
	import { isPUBLIC } from '$lib/stores/isPUBLIC'
	import { isPUBLICgroupData } from '$lib/stores/isPUBLICgroupData'

	// $canSend = false

	onMount(() => {
		$isPUBLIC = true
		$currentPage = 'PUB'
		$userGroup_id = JSON.parse(data.body.data)._id
		const bodyData = JSON.parse(data.body.data)
		$isPUBLICgroupData = JSON.parse(data.body.data)

		console.log('JSON.parse(data.body.data)', JSON.parse(data.body.data))

		pusher.subscribe(JSON.parse(data.body.data)._id).bind('inserted_Put', (data: any) => {
			console.log(data.message)
			console.log(data)
		})

		// JSON.parse(data.body.data).allUsers.forEach((user: any) => {
		// 	console.log(user._id)
		// 	console.log($userName_id)
		// 	if (user._id !== $userName_id) {
		// 		$canSend = true
		// 		console.log('$canSend?', $canSend)
		// 	} else if (user._id === $userName_id) {
		// 		$canSend = false
		// 		console.log('$canSend', $canSend)
		// 	}
		// })

		// if ($isPUBLIC === true) {
		// 	$isPUBLICgroupData.allUsers.forEach((user: any) => {
		// 		// console.log(user._id)
		// 		// console.log($userName_id)
		// 		if (user._id !== $userName_id) {
		// 		} else if (user._id === $userName_id) {
		// 		}
		// 	})
		// }
	})

	onDestroy(() => {
		$isPUBLIC = false
	})
</script>
