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

<div class="topHeaderRight" style={$isFlex ? 'border-bottom-left-radius:0' : 'border-bottom-left-radius:var(--borderRadius);border-top-left-radius:calc(var(--borderRadius)/3);border-top-right-radius:calc(var(--borderRadius)/3)'}>
	<div class="headerTextBox">
		<h1 class="chatHeaderText">
			{#if $currentPage === 'HASH'}<span>#{$currentGroupName.toUpperCase()}</span>{:else}<span>{$currentGroupName.toUpperCase()}</span>{/if}
		</h1>
	</div>
	<button class="absoluteBox boxLeft" on:click={toggle}><img class="arrow {$isFlex ? 'rotate' : 'notRotate'}" src={arrowButton} alt="arrow" /></button>
	<button class="absoluteBox boxRight" />
</div>

<style>
	.rotate {
		transform: rotate(90deg);
	}
	.notRotate {
		transform: rotate(-90deg);
	}
	.absoluteBox {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;

		position: absolute;
	}
	.chatHeaderText {
		font-family: UBold;
		color: var(--disabled);

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

		.chatHeaderText {
			/* scale: 0.9; */
			font-size: 1rem;
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
