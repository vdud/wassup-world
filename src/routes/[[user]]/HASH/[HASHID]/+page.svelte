<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import AllGroupMessages from '$lib/reusableComponents/AllGroupMessages.svelte';
</script>

<svelte:head>
	<!-- <title>#️⃣{data.body.groupName}</title> -->
	<title>#️⃣{data.body.groupName} - Chat & Connect on Wassup.World 🤝 🌟</title>
	<meta name="description" content="Join the upbeat convo at #️⃣{data.body.groupName} on wassup.world, a lively open chat room to connect with others, anonymously or with your name! 😄🎉" />
</svelte:head>

<AllGroupMessages {data} />
