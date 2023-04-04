<script lang="ts">
	import type { PageData } from './$types';
	import AllGroupMessages from '$lib/reusableComponents/AllGroupMessages.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>💬 {data.body.groupName}</title>
	<meta name="description" content="See what's happening!" />
</svelte:head>

<AllGroupMessages {data} />
