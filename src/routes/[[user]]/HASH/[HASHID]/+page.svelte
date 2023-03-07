<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { onMount } from 'svelte'
	import { canSend } from '$lib/stores/canSend'
	import { pusher } from '$lib/pusher'

	console.log(data)

	onMount(() => {
		$userGroup_id = JSON.parse(data.body.data)._id
		console.log('GroupId = ' + $userGroup_id)

		pusher.subscribe($userGroup_id).bind('inserted', (data: any) => {
			console.log(data.message)
			console.log(data)
		})
	})

	console.log($canSend)
</script>
