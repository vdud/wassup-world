<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import AllGroupMessages from '$lib/reusableComponents/AllGroupMessages.svelte';
</script>

<svelte:head>
	<!-- <title>📍{data.body.groupName}</title> -->
	<title>📍{data.body.groupName} - Socialize & Engage on Our App 🌐 🎉</title>
	<meta name="description" content="📍:{data.body.groupName} - Join wassup.world's open chat, chat anonymously or with your name, and connect with others frankly!" />
</svelte:head>

<AllGroupMessages {data} />
