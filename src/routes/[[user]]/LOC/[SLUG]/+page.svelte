<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { onMount } from 'svelte'
	import { pusher } from '$lib/pusher'
	onMount(() => {
		$userGroup_id = JSON.parse(data.body.data)._id

		pusher.subscribe($userGroup_id).bind('inserted', (data: any) => {
			console.log(data.message)
			console.log(data)
		})
	})
</script>

<div class="middleScroll">
	<div class="slot">
		<div class="whiteSpace" />
		<div class="text sender" />
		<div class="text yoMe" />
	</div>
</div>

<style>
	.text {
		height: 100px;
		border-radius: var(--borderRadius);
		/* width: clamp(640px, 80%, 800px); */
		width: clamp(520px, 80%, 800px);
		margin: var(--averageMargin);
		background-color: var(--primaryTheme);
	}
	.sender {
		place-self: start;
		border-top-left-radius: calc(var(--borderRadius) / 4);
	}
	.yoMe {
		place-self: end;
		border-bottom-right-radius: calc(var(--borderRadius) / 4);
	}
	.whiteSpace {
		height: 10000px;
		width: 100%;

		background-color: var(--secondaryTheme);
	}
	.middleScroll {
		text-align: center;
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column-reverse;
		justify-content: start;
		align-items: center;

		position: relative;
		overflow: hidden;
		overflow-y: scroll;
	}

	.slot {
		height: fit-content;
		margin-bottom: 2rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		position: absolute;
		bottom: 0;
		left: 0;

		padding: 1rem 0;
	}

	@media screen and (max-width: 768px) {
		.text {
			width: 75%;
		}
	}

	@media screen and (min-width: 1410px) {
	}

	/* Designing for scroll-bar */
</style>
