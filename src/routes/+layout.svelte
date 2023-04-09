<script lang="ts">
	import '$lib/css/middle-left.css';
	import '../css/new-app.css';
	import { page } from '$app/stores';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });

	import { isFlex } from '$lib/stores/isFlex';
	import { isLocked } from '$lib/stores/isLocked';
	import { nature } from '$lib/stores/nature';
	import { currentPage } from '$lib/stores/currentPage';
	import { searchInput } from '$lib/stores/searchInput';

	import { userName } from '$lib/stores/userName';
	import { pusher } from '$lib/bigFunctions/pusher';

	import TopHeaderLeft from '$lib/components/Top-Header-Left.svelte';
	import TopHeaderRight from '$lib/components/Top-Header-Right.svelte';
	import BottomNav from '$lib/components/Bottom-Nav.svelte';
	import BottomTextArea from '$lib/components/Bottom-Text-Area.svelte';
	import MiddleSearchData from '$lib/components/Middle-Search-Data.svelte';
	import MiddleNavData from '$lib/components/Middle-Nav-Data.svelte';
	import LockScreen from '$lib/components/Lock-Screen.svelte';

	import { onDestroy, onMount } from 'svelte';
	import { userGroup_id } from '$lib/stores/userGroup_id';

	onMount(() => {
		const savedNatureDataString = localStorage.getItem('nature');
		if (savedNatureDataString) {
			try {
				const { $nature: natureString } = JSON.parse(savedNatureDataString);
				if (natureString != '') {
					$nature = natureString;
				}
			} catch (err) {
				console.error(err);
			}
		} else {
			$nature = 'LOCATION';
		}

		const PlacesApi = document.createElement('script');
		PlacesApi.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_ENV_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
		PlacesApi.async = true;
		PlacesApi.defer = true;
		document.body.appendChild(PlacesApi);
	});

	const tilda = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			e.preventDefault();
			$isLocked = true;
		} else if (e.key === '`') {
			e.preventDefault();
			$isFlex = !$isFlex;
		} else if (e.key === 'Tab') {
			e.preventDefault();
			if ($nature === 'LOCATION') {
				$nature = 'HASHTAG';
			} else if ($nature === 'HASHTAG') {
				$nature = 'PUBLIC';
			} else if ($nature === 'PUBLIC') {
				$nature = 'LOCATION';
			}
		}
	};
	onDestroy(() => {
		pusher.disconnect();
	});
</script>

<div class="main">
	<div class="window">
		<div class="absoluteFirstWindow lockScreen" style={$isLocked ? '' : 'display:none;'}>
			<LockScreen />
		</div>
		<div class="windows windowLeft {$isFlex ? 'show' : 'notShow'} {$isFlex ? 'width' : 'nonWidth'}">
			<div class="windowContainers container1 leftMargin">
				<TopHeaderLeft />
			</div>
			<div class="windowContainers container2">
				{#if $searchInput != ''}
					<MiddleSearchData />
				{:else}
					<MiddleNavData />
				{/if}
			</div>
			<div class="windowContainers container3">
				<BottomNav />
			</div>
		</div>
		<div class="windows windowRight {$isFlex ? 'notWide' : 'wide'} {$isFlex ? 'nonWidth' : 'width'}">
			<div class="windowContainers container1 {$isFlex ? 'rightMargin' : 'overMargin'}">
				<TopHeaderRight />
			</div>
			<div class="windowContainers container2">
				{#key $page.url.pathname}
					<slot />
				{/key}
			</div>
			<div class="windowContainers container3" style={$currentPage === '' ? 'display:none;' : ''}><BottomTextArea /></div>
		</div>
	</div>
</div>

<svelte:window on:keydown={tilda} />

<style>
	.absoluteFirstWindow {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		position: absolute;
		border-radius: calc(var(--borderRadius) / 2);
	}
	.lockScreen {
		background-color: var(--primaryTheme);
	}
	.leftMargin {
		margin-left: calc(var(--averageMargin) / 2);
	}
	.rightMargin {
		margin-right: calc(var(--averageMargin) / 2);
	}

	.show {
		transition: all 300ms ease-in-out;
		width: 36%;
		z-index: 0;
		opacity: 100%;
	}
	.notShow {
		transition: all 300ms ease-in-out;
		opacity: 0%;
		z-index: 0;
		width: 0%;
	}
	.wide {
		transition: width 300ms ease-in-out;
		width: 100%;
		z-index: 1;
	}
	.notWide {
		width: 65%;
		transition: width 300ms ease-in-out;
		z-index: 1;
	}

	.windowContainers {
		width: 100%;
		overflow: hidden;
	}
	.container1 {
		height: 100px;

		position: absolute;

		top: 0;

		z-index: 1;
		overflow: hidden;
		border-top-left-radius: calc(var(--borderRadius) / 2);
	}
	.container2 {
		height: 100%;

		z-index: 0;

		padding-bottom: 0rem;
		background-color: var(--secondaryTheme);
	}
	.container3 {
		height: 75px;
		z-index: 1;

		position: absolute;
		bottom: 0;
		overflow: visible;

		display: flex;
		align-items: flex-end;
		justify-content: center;

		background-color: transparent;

		pointer-events: none;
	}
	.main {
		position: relative;
		bottom: 0;
		right: 0;
		left: 0;
		top: 0;

		display: flex;
		align-items: center;
		justify-content: center;

		overflow: hidden;

		width: 100%;
		height: 100%;
	}

	.window {
		display: flex;
		justify-content: center;
		position: relative;
		align-items: center;

		height: 100%;
		width: clamp(300px, 100%, 1450px);

		overflow: hidden;
		box-shadow: var(--boxShadowsBlur);

		background-color: var(--primaryTheme);
	}
	.windows {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		overflow: hidden;
		position: relative;

		background-color: var(--primaryTheme);

		border-right: 1px solid var(--tertiaryTheme);
	}
	@media screen and (max-width: 768px) {
		.leftMargin {
			margin-left: 0px;
		}
		.rightMargin {
			margin-right: 0px;
		}
		.width {
			animation: slideIn 1s both;

			z-index: 1;
		}

		.nonWidth {
			z-index: 0;
			animation: slideOut 1s both;
		}

		@keyframes slideIn {
			0% {
				transform: translateX(-100%);
				opacity: 0;
			}

			100% {
				transform: translateX(0);
				opacity: 1;
			}
		}

		@keyframes slideOut {
			0% {
				transform: translateX(0);
				opacity: 1;
			}

			100% {
				transform: translateX(-100%);
				opacity: 0;
			}
		}

		.main {
			bottom: 0;
			right: 0;
			left: 0;
			position: absolute;
			height: 100%;
			width: 100%;
		}
		.window {
			height: 99.8%;
			width: 100%;
			margin: 0;
			position: relative;
		}
		.windows {
			box-shadow: var(--boxShadows);
		}

		.windowLeft {
			width: 100vw;
			position: absolute;
			bottom: 0;
			right: 0;
			top: 0;
			left: 0;

			z-index: 0;
		}
		.windowRight {
			z-index: 1;

			position: absolute;
			width: 100vw;
			border-left: none;
			bottom: 0;
			right: 0;
			top: 0;
			left: 0;
		}
	}

	@media screen and (min-width: 1410px) {
		.container1 {
			margin-top: calc(var(--averageMargin) / 2);
			border-radius: var(--borderRadius);
		}
		.leftMargin {
			border-radius: var(--borderRadius) 0 0 var(--borderRadius);
			margin-left: var(--averageMargin);
		}
		.rightMargin {
			border-radius: 0 var(--borderRadius) var(--borderRadius) 0;
			margin-right: var(--averageMargin);
			border-bottom-right-radius: var(--borderRadius);
		}
		.window {
			height: 98%;
			margin: 10px;
			border: 1px solid var(--tertiaryTheme);

			overflow: hidden;

			border-radius: 10px;
			overflow: hidden;
		}
		.windows {
			border-radius: calc(var(--borderRadius) / 2);
			overflow: hidden;
		}

		.overMargin {
			width: 99%;
		}
	}
	/* @media screen and (min-width: 1810px) {
		.window {
			width: 1800px;
		}
	} */
</style>
