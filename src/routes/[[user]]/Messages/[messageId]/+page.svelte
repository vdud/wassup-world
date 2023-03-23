<script lang="ts">
	import { isFlex } from '$lib/stores/isFlex'
	import { onMount } from 'svelte'
	import type { PageData } from './$types'

	export let data: PageData

	console.log('data', JSON.parse(data.body.data))

	onMount(() => {
		$isFlex = false
	})
</script>
