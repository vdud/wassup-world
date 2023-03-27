<script lang="ts">
	import { currentLayoutPage } from '$lib/stores/currentLayoutPage'
	import { fullDisplay } from '$lib/stores/fullDisplay'
	import { isFlex } from '$lib/stores/isFlex'
	import { user_message } from '$lib/stores/user_message'
	import { currentPageHeaderData } from '$lib/stores/currentPageHeaderData'
	import { currentGroupCreatedAt } from '$lib/stores/currentGroupCreatedAt'

	// import imageLogoSrc from '../../lib/assets/newL.svg'
	import imageLogoSrc from '$lib/assets/fknLatest.png'

	import arrowButton from '$lib/assets/arrowButton.svg'
	import { currentPage } from '$lib/stores/currentPage'
	import { timeSince } from '$lib/bigFunctions/timeFormat'
	import { isShowInfo } from '$lib/stores/isShowInfo'
	import { titleData } from '$lib/stores/titleData'
	import { userName } from '$lib/stores/userName'
	import { middleScroll } from '$lib/stores/middleScroll'
	import { interChangableMessage } from '$lib/stores/interChangableMessage'

	let groupName = 'world'

	const toggle = () => {
		$fullDisplay = 'nonHidden'
		$isFlex = !$isFlex
		// window.location.pathname = '/'
		// window.location.href = '/'

		setTimeout(() => {
			// $user_message = ''
			$fullDisplay = 'hidden'
		}, 600)
	}
	const togglehRef = () => {
		const middleScroll: any = document.getElementById('middleScroll')
		$isShowInfo = !$isShowInfo
		// if (middleScroll.scrollTop === scrollTop) {
		// }
		setTimeout(() => {
			middleScroll.scrollTop = middleScroll.scrollHeight * -1
		}, 10)
	}
	const headToTop = () => {
		const middleScroll: any = document.getElementById('middleScroll')
		middleScroll.scrollTop = middleScroll.scrollHeight * -1
	}
</script>

<div class="topHeaderRight" style={$isFlex ? 'border-bottom-left-radius:0' : 'border-bottom-left-radius:var(--borderRadius);border-top-left-radius:calc(var(--borderRadius)*.5);'}>
	<button on:click={headToTop} class="headerTextBox">
		<h1 class="chatHeaderText">
			{#if $currentPage !== ''}
				<span>
					{#if $currentPage === 'HASHTAGS'}
						#️⃣
					{:else if $currentPage === 'LOCATIONS'}
						📍
					{/if}
					{$currentPageHeaderData.toUpperCase().slice(0, 30)}

					{#if $currentPageHeaderData.length > 29}
						...
					{/if}
				</span>
			{:else}
				<span>{$currentPageHeaderData.toUpperCase()}</span>
			{/if}
		</h1>
		<div class="pFlex">
			{#if $currentPage !== ''}
				{#if $currentPageHeaderData.length > 29}
					<p class="chatPText">
						{$currentPageHeaderData.toUpperCase().slice(0, 60)}{#if $currentPageHeaderData.length > 59}...{/if}
					</p>
				{/if}
			{:else}
				<p class="chatPText">{$titleData}</p>
			{/if}
		</div>
		<!-- {#if $currentPage !== '' && $currentGroupCreatedAt !== 0} -->
		<div class="pFlex">
			<p class="chatPText" style="font-family: Imprima;">{$interChangableMessage}</p>
		</div>
	</button>
	<button class="absoluteBox boxLeft" on:click={toggle}><i class="fa-solid fa-bars" style="color: var(--secondary);scale:1.4;" /></button>
	<!-- <button class="absoluteBox boxLeft2" on:click={togglehRef}><i class="fa-solid fa-house" style="color: var(--primary);scale:1.4;" /></button> -->

	<button class="absoluteBox boxRight" on:click={togglehRef}><div><img class="Logo" src={imageLogoSrc} alt="Logo" /></div></button>
</div>

<style>
	.pFlex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 5px;
	}
	.Logo {
		scale: 0.08;
		margin-top: calc(var(--averageMargin) * 0.3);
		/* margin-left: calc(var(--averageMargin) / 3); */

		transition: scale 239ms ease-in-out;
		border-radius: 23%;
		/* box-shadow: var(--boxShadowsBlur), var(--boxInsetShadows); */
		/* filter: invert() sepia() saturate(0) hue-rotate(0deg) brightness(1.2) contrast(1.2); */
	}
	.fa-bars {
		text-shadow: 0 0 10px var(--secondary);
	}
	.absoluteBox {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;

		position: absolute;
	}
	.boxLeft {
		left: calc(var(--averageMargin) * 2);
	}
	.boxRight {
		right: calc(var(--averageMargin) * 2);
		/* background-color: var(--optDark); */
		/* box-shadow: none; */
		overflow: hidden;
		border: 1px solid var(--optDark);
		/* overflow: hidden; */
	}
	.boxRight:hover,
	.boxRight:active {
		box-shadow: var(--boxShadowsBlur);
	}
	.chatPText {
		font-family: UBold;
		color: var(--primaryThemeInverted);
		background-color: var(--tertiaryThemeInverted);
		font-size: 0.6rem;
		margin: 0;
		padding: 4px 10px;
		border-radius: calc(var(--borderRadius) / 3);
		box-shadow: var(--boxInsetShadows);
		width: max-content;
	}
	.chatHeaderText {
		height: max-content;
		font-family: UBold;
		color: var(--primaryThemeInverted);

		margin-top: 12px;
		font-size: clamp(calc(var(--fontSize) * 1.2), 1vw, calc(var(--fontSize) * 2));
		/* font-size: 0rem; */
		text-align: center;
		/* margin-left: 6rem; */
		background-color: var(--optDark);

		/* color: var(--primaryThemeInverted); */
		/* opacity: var(--dull); */

		padding: 0.2rem 1rem;
		/* box-shadow: var(--boxInsetShadows); */
		/* box-shadow: var(--boxShadows); */
		border-radius: calc(var(--borderRadius) * 2);
		border: 4px solid var(--white);
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
		/* overflow: hidden; */
	}
	.headerTextBox {
		overflow: hidden;
		width: 100%;
		height: 100%;

		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: column;
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
			/* padding-top: 23px; */
		}
	}

	@media screen and (min-width: 1410px) {
		.topHeaderRight {
			border-top-right-radius: calc(var(--borderRadius) / 1.5);

			overflow: hidden;
		}
	}
</style>
