<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { onMount } from 'svelte'
	onMount(() => {
		$userGroup_id = JSON.parse(data.body.data)._id
		console.log('GroupId = ')
		console.log('GroupId = ' + $userGroup_id)
	})
</script>
