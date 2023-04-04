<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { currentPageHeaderData } from '$lib/stores/currentPageHeaderData';
	import AllGroupMessages from '$lib/reusableComponents/AllGroupMessages.svelte';
</script>

<svelte:head>
	<title>{$currentPageHeaderData}</title>
	<meta name="description" content="This is a simple discourse on hashtag : {$currentPageHeaderData}, as wassup.world is just a open chat room, where you can talk to any person anonymously or just using your name." />
</svelte:head>

<AllGroupMessages {data} />
