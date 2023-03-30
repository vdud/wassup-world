<script>
	import imgSource from '$lib/assets/menuItems.jpg'
	import { currentPage } from '$lib/stores/currentPage'

	export let images = [imgSource, imgSource]

	let img1 = 'https://source.unsplash.com/U7HLzMO4SIY'
	let img2 = 'https://source.unsplash.com/ukzHlkoz1IE'
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
	let isShowMenu = false
	const isShowMenuToggle = () => {
		isShowMenu = !isShowMenu
	}
</script>

{#if $currentPage === 'LOCATIONS'}
	<button on:click={isShowMenuToggle} class="fullWindow" style={isShowMenu ? '' : 'display:none'}><img src={img2} alt="image {active + 1}" class="imageMain" /></button>
	<div class="pTextAdContainer">
		<button on:click={isShowMenuToggle} class="replyBox">
			<img src={img2} alt="image {active + 1}" class="image" />
		</button>
	</div>
{/if}

<style>
	/* .imageMain {
		pointer-events: none;
		cursor: none;
	} */
	.fullWindow {
		width: 100%;
		height: 100%;

		position: absolute;
		z-index: 100;

		display: flex;
		align-items: center;
		justify-content: center;

		background-color: #000;
	}
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
		transform: translateY(-50%);
	}
	.pTextAdContainer {
		display: flex;
		justify-content: start;
		align-items: center;

		width: 100%;
		height: clamp(100px, 100%, 176px);
		/* height: 200px; */

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

		/* overflow-x: scroll; */
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
