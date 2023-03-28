<script>
	export let imgSrc = 'https://thumbs.dreamstime.com/b/hourglass-time-banner-background-format-wood-54533019.jpg'
	export let images = ['https://thumbs.dreamstime.com/b/hourglass-time-banner-background-format-wood-54533019.jpg', 'https://thumbs.dreamstime.com/b/hourglass-time-banner-background-format-wood-54533019.jpg']
	export let active = 0
	let i = 0

	import { onMount } from 'svelte'

	onMount(() => {
		const interval = setInterval(() => {
			active = (active + 1) % images.length
			imgSrc = images[active]
			i++
		}, 3000)

		return () => clearInterval(interval)
	})
</script>

<div class="pTextAdContainer">
	<div class="replyBox">
		{#each images as image, i}
			<img src={image} alt="image {active + 1}" class="image" />
		{/each}
	</div>
</div>

<style>
	.image {
		width: 100%;
	}
	.pTextAdContainer {
		display: flex;
		justify-content: start;
		align-items: center;

		width: 100%;
		height: 100px;

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
