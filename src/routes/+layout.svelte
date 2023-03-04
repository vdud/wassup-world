<script lang="ts">
	import '$lib/css/middle-left.css'
	import '../css/new-app.css'
	import { isFlex } from '$lib/stores/isFlex'
	import { isLocked } from '$lib/stores/isLocked'
	import { nature } from '$lib/stores/nature'
	import { searchInput } from '$lib/stores/searchInput'

	import type { LayoutData } from './$types'

	import TopHeaderLeft from '$lib/components/Top-Header-Left.svelte'
	import TopHeaderRight from '$lib/components/Top-Header-Right.svelte'
	import BottomNav from '$lib/components/Bottom-Nav.svelte'
	import BottomTextArea from '$lib/components/Bottom-Text-Area.svelte'
	import MiddleSearchData from '$lib/components/Middle-Search-Data.svelte'
	import MiddleNavData from '$lib/components/Middle-Nav-Data.svelte'
	import LockScreen from '$lib/components/Lock-Screen.svelte'

	export let data: LayoutData
	console.log(data)

	function initMap() {
		alert('ok')
	}
	import Pusher from 'pusher-js'
	import { onDestroy, onMount } from 'svelte'

	let zIndex = 0

	onMount(() => {
		const savedNatureDataString = localStorage.getItem('nature')
		if (savedNatureDataString) {
			try {
				const { $nature: natureString } = JSON.parse(savedNatureDataString)
				if (natureString != '') {
					$nature = natureString
				}
			} catch (err) {
				console.error(err)
			}
		} else {
			$nature = 'HASHTAG'
		}

		const PlacesApi = document.createElement('script')
		PlacesApi.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_ENV_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`
		PlacesApi.async = true
		PlacesApi.defer = true
		document.body.appendChild(PlacesApi)
	})

	Pusher.logToConsole = true
	const pusher = new Pusher(import.meta.env.VITE_APP_KEY, {
		cluster: import.meta.env.VITE_APP_CLUSTER,
	})
	let privateChannel = pusher.subscribe('privateChannelName').bind('client-my-event', (data: any) => {
		alert(data.message)
	})

	onDestroy(() => {
		pusher.unsubscribe('privateChannelName')
		pusher.disconnect()
	})
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
				<slot />
			</div>
			<div class="windowContainers container3"><BottomTextArea /></div>
		</div>
	</div>
</div>

<style>
	.absoluteFirstWindow {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
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
		width: 30%;
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
		width: 70%;
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
	}
	.container2 {
		height: 100%;

		z-index: 0;

		padding-bottom: 0rem;
	}
	.container3 {
		height: 75px;
		z-index: 1;

		position: absolute;
		bottom: 0;
		overflow: visible;

		background-color: transparent;
	}
	.main {
		position: absolute;

		display: flex;
		align-items: center;
		justify-content: center;

		height: 100%;
		width: 100%;
	}

	.window {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;

		height: 100%;
		width: clamp(300px, 100%, 1450px);

		overflow: hidden;

		background-color: var(--secondaryTheme);
	}
	.windows {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		overflow: hidden;
		position: relative;

		background-color: var(--secondaryTheme);
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
			top: 0;
		}
		.window {
			height: 99.8%;
			width: 100%;
			margin: 0;
		}
		.windows {
			box-shadow: var(--boxShadows);
		}

		.windowLeft {
			width: 100vw;
			position: absolute;

			z-index: 0;
		}
		.windowRight {
			z-index: 1;

			position: absolute;
			width: 100vw;
			border-left: none;
		}
	}

	@media screen and (min-width: 1410px) {
		.container1 {
			margin-top: calc(var(--averageMargin) / 2);
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
			border-radius: calc(var(--borderRadius));
			height: 98%;
			margin: 10px;
			border: 1px solid var(--tertiaryTheme);

			overflow: hidden;
		}

		.overMargin {
			width: 99%;
		}
	}
	@media screen and (min-width: 1810px) {
		.window {
			width: 1800px;
		}
	}
</style>
