<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { onDestroy, onMount } from 'svelte'
	import { canSend } from '$lib/stores/canSend'
	import { pusher } from '$lib/pusher'
	import { currentPage } from '$lib/stores/currentPage'

	console.log(data)

	onMount(() => {
		$currentPage = 'HASH'
		$canSend = false
		$userGroup_id = JSON.parse(data.body.data)._id
		console.log('GroupId = ' + $userGroup_id)

		pusher.subscribe($userGroup_id).bind('inserted_Put', (data: any) => {
			console.log(data.message)
			console.log(data)
		})
	})

	onDestroy(() => {
		$currentPage = ''
		$canSend = true
	})

	console.log($canSend)
</script>
