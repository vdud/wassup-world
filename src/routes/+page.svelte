<script>
	import { currentPage } from '$lib/stores/currentPage'
	import { onMount } from 'svelte'
	import { autoresize } from 'svelte-textarea-autoresize'

	onMount(() => {
		$currentPage = ''
	})
</script>

<svelte:head>
	<title>HOME</title>
	<meta name="description" content="OPEN-SOURCE CHAT-APP" />
</svelte:head>

<div class="middleScroll">
	<div class="slot">
		<div class="whiteSpace " />
		<div class="text sender" />
		<div class="text yoMe" />

		<!-- <div class="textAreeaBox">
			<div class="button" />
			<textarea use:autoresize class="textArea" placeholder="Type something long into me.." />
		</div> -->
	</div>
</div>

<style>
	.textAreeaBox {
		width: 100%;
		height: fit-content;
		background-color: var(--primary);
		display: flex;
		justify-content: center;
		align-items: flex-end;

		position: relative;
	}

	.button {
		position: absolute;
		padding: 1.2rem;
		background-color: var(--red);

		right: 0.45rem;
		bottom: 0.45rem;
		margin: 10px;
	}
	.textArea {
		width: 100%;
		height: 100%;
		margin: 10px;
		padding: 1rem;
		border: none;
		outline: none;
		resize: none;
		font-size: 1.2rem;
		border-radius: calc(var(--borderRadius) / 4);

		max-height: 100px;
	}

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
