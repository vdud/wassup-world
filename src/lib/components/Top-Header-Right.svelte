<script lang="ts">
	import { currentLayoutPage } from '$lib/stores/currentLayoutPage'
	import { fullDisplay } from '$lib/stores/fullDisplay'
	import { isFlex } from '$lib/stores/isFlex'
	import { user_message } from '$lib/stores/user_message'

	let groupName = 'world'

	const toggle = () => {
		$fullDisplay = 'nonHidden'

		$isFlex = !$isFlex

		setTimeout(() => {
			// $user_message = ''
			$fullDisplay = 'hidden'
		}, 600)
	}
</script>

<div class="topHeaderRight" style={$isFlex ? 'border-bottom-left-radius:0' : 'border-bottom-left-radius:var(--borderRadius);border-top-left-radius:calc(var(--borderRadius)/3);border-top-right-radius:calc(var(--borderRadius)/3)'}>
	<div class="headerTextBox">
		<h1 class="chatHeaderText">
			<span>#</span>{#if groupName != ''}<span>Harry Potter</span>{/if}
		</h1>
	</div>
	<button class="absoluteBox boxLeft" on:click={toggle} />
	<button class="absoluteBox boxRight" />
</div>

<style>
	.chatHeaderText {
		font-family: UBOLD;
		color: var(--primary);

		color: var(--primaryThemeInverted);
		opacity: var(--dull);

		padding: 1rem;
	}

	.topHeaderRight {
		position: relative;
		height: 100%;
		width: 100%;
		background: var(--primaryTheme);

		border-bottom-right-radius: var(--borderRadius);

		box-shadow: var(--boxShadows);

		/* margin: 0 var(--topLeftMargin) 0 0; */
		/* transform: translateX(var(--topRightMargin)); */
		overflow: visible;
	}
	.boxLeft {
		left: calc(var(--averageMargin) * 2);
	}
	.boxRight {
		right: calc(var(--averageMargin) * 2);
	}
	.headerTextBox {
		overflow: hidden;
		width: 100%;
		height: 100%;

		display: flex;
		align-items: flex-start;
		justify-content: center;
	}

	@media screen and (max-width: 768px) {
		.topHeaderRight {
			border-bottom-left-radius: var(--borderRadius);
			border-top-left-radius: 0px;

			transform: translateX(0);
		}
		.boxLeft {
			left: var(--averageMargin);
		}
		.boxRight {
			right: var(--averageMargin);
		}
	}

	@media screen and (min-width: 1410px) {
		.topHeaderRight {
			border-top-right-radius: calc(var(--borderRadius) / 1.5);

			overflow: hidden;
		}
	}
</style>
