<script lang="ts">
	import { currentLayoutPage } from '$lib/stores/currentLayoutPage'
	import { fullDisplay } from '$lib/stores/fullDisplay'
	import { isFlex } from '$lib/stores/isFlex'
	import { user_message } from '$lib/stores/user_message'
	import { currentGroupName } from '$lib/stores/currentGroupName'

	import arrowButton from '$lib/assets/arrowButton.svg'
	import { currentPage } from '$lib/stores/currentPage'

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

<div class="topHeaderRight" style={$isFlex ? 'border-bottom-left-radius:0' : 'border-bottom-left-radius:var(--borderRadius);border-top-left-radius:calc(var(--borderRadius)*.5)'}>
	<div class="headerTextBox">
		<h1 class="chatHeaderText">
			{#if $currentPage === 'HASH'}<span
					>#{$currentGroupName.toUpperCase().slice(0, 50)}{#if $currentGroupName.length > 49}...{/if}</span
				>{:else}<span
					>{$currentGroupName.toUpperCase().slice(0, 50)}{#if $currentGroupName.length > 49}...{/if}</span
				>{/if}
		</h1>
	</div>
	<button class="absoluteBox boxLeft" on:click={toggle}><i class="fa-solid fa-house" style="color: var(--secondary);scale:1.4;" /></button>
	<button class="absoluteBox boxRight" />
</div>

<style>
	.absoluteBox {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;

		position: absolute;
	}
	.chatHeaderText {
		font-family: UBold;
		color: var(--tertiaryThemeInverted);

		margin: 0 3rem;
		font-size: clamp(calc(var(--fontSize) * 1.2), 1vw, calc(var(--fontSize) * 2));
		/* font-size: 0rem; */
		text-align: center;

		/* color: var(--primaryThemeInverted); */
		/* opacity: var(--dull); */

		padding: 1rem;
	}
	.arrow {
		width: 24px;
		height: 24px;
		margin: 0;
		padding: 0;
		background-color: transparent;
		/* transform: rotate(90deg); */
		filter: invert(0.9);
		transition: transform 0.3s ease-in-out;
	}

	.topHeaderRight {
		position: relative;
		height: 100%;
		width: 100%;
		background: var(--secondaryTheme);

		border-bottom-right-radius: var(--borderRadius);

		/* box-shadow: var(--boxShadows); */

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
		/* margin: 0 10rem; */
		/* background-color: red; */
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

		.chatHeaderText {
			/* scale: 0.9; */
			font-size: 0.75rem;
			padding-top: 23px;
		}

		.notRotate {
			transform: rotate(90deg);
		}
	}

	@media screen and (min-width: 1410px) {
		.topHeaderRight {
			border-top-right-radius: calc(var(--borderRadius) / 1.5);

			overflow: hidden;
		}
	}
</style>
