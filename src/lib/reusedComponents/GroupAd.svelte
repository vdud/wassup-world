<script>
	import imgSource from '$lib/assets/pageLabels.png'
	export let images = [imgSource, imgSource]
	export let active = 0
	let i = 0

	import { onMount } from 'svelte'

	onMount(() => {
		const interval = setInterval(() => {
			active = (active + 1) % images.length
			i++
		}, 3000)

		return () => clearInterval(interval)
	})
</script>

<div class="pTextAdContainer">
	<div class="replyBox">
		{#each images as image, i}
			<img src={image} alt="image {active + 1}" class="image" />
			{#if i === 0}
				<div class="overlayImg" />
			{/if}
		{/each}
	</div>
</div>

<style>
	.overlayImg {
		/* background-color: yellow; */
		margin: 0 3rem;

		width: calc(100% - 7.6rem);
		/* height: calc(100% - 4rem); */
		height: 100%;

		position: absolute;
		display: flex;
		align-items: center;
		justify-content: space-around;
		/* scale: 0.989; */
		/* z-index: -1; */
	}
	.image {
		width: 100%;
	}
	.pTextAdContainer {
		display: flex;
		justify-content: start;
		align-items: center;

		width: 100%;
		height: clamp(100px, 100%, 176px);

		padding: calc(var(--averageMargin) * 1.2) 0;
	}
	.replyBox {
		color: var(--primaryThemeInverted);
		font-size: 1rem;
		opacity: 0.9;
		border-radius: var(--averageMargin);
		width: calc(100% - calc(var(--averageMargin) * 2));
		margin: calc(var(--averageMargin) * 2) var(--averageMargin);
		overflow: hidden;

		height: 100%;
		width: 100%;
		display: flex;
		align-items: start;
		justify-content: start;

		overflow-x: scroll;
		position: relative;
	}

	@keyframes slide {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>
