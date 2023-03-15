<script lang="ts">
	import { currentLayoutPage } from '$lib/stores/currentLayoutPage'
	import { fullDisplay } from '$lib/stores/fullDisplay'
	import { isFlex } from '$lib/stores/isFlex'
	import { isLocked } from '$lib/stores/isLocked'
	import { userName } from '$lib/stores/userName'
	import { user_message } from '$lib/stores/user_message'

	import { nature } from '$lib/stores/nature'
	import { searchInput } from '$lib/stores/searchInput'
	import { locationPrediction } from '$lib/stores/locationPrediction'
	import { json } from '@sveltejs/kit'
	// import { searchGET } from '$lib/stores/pusher'
	import { onDestroy, onMount } from 'svelte'
	import { searchData } from '$lib/stores/searchData'
	import { canSend } from '$lib/stores/canSend'

	$: $searchInput = $searchInput
		// .trim()
		.replace(/\s/g, '-')
		.replace(/[^a-zA-Z0-9-]/g, '')
		.toLowerCase()
		.replace(/-+/g, '-')

	let name = 'world'

	const toggle = () => {
		$canSend = false
		$fullDisplay = 'nonHidden'

		$isFlex = !$isFlex

		setTimeout(() => {
			// $user_message = ''
			$fullDisplay = 'hidden'
		}, 600)
	}

	let response: any
	function handleDown(event: any) {
		$locationPrediction = [
			{
				description: '#',
				structured_formatting: {
					main_text: '',
					secondary_text: 'LOADING...',
				},
				types: [],
			},
		]
	}

	//TypeScript DebounceFunction
	type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void

	function debounce<T extends (...args: any[]) => any>(func: T, wait: number): DebouncedFunction<T> {
		let timeout: ReturnType<typeof setTimeout>
		return function executedFunction(this: unknown, ...args: Parameters<T>) {
			const later = () => {
				timeout = undefined!
				func.apply(this, args)
			}
			clearTimeout(timeout)
			timeout = setTimeout(later, wait)
		}
	}

	//DebouncedSearchData
	const debouncedHandleClick = debounce(handleClick, 1000)

	//Main Function
	async function handleClick(event: any) {
		//Location-Google-Services-Prediction
		const service = new google.maps.places.AutocompleteService()

		try {
			const predictions = service.getPlacePredictions({ input: $searchInput }).then((predictions: any) => {
				$locationPrediction = predictions.predictions
			})
		} catch (e) {
			console.log(e)
		}

		// search-Data-GET
		const searchInputData: any = $searchInput.trim()
		if ($searchInput != '') {
			const res = await fetch('/api/searchData', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ searchInputData }),
			})
			const response = await res.json()
			$searchData = response.data

			if (!res.ok) {
				alert('failed to search data')
				alert(response.message)
			}
		} else {
			$locationPrediction = [
				{
					description: '',
					structured_formatting: {
						main_text: '',
						secondary_text: '404',
					},
					types: ['NOT FOUND'],
				},
			]
		}
	}
</script>

<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

<div class="topHeaderLeft">
	<button
		class="textBox"
		on:click={() => {
			$isLocked = !$isLocked
		}}>
		<h1 class="headerText">
			<span style="color: var(--secondary)">wassup </span><span>{$userName}</span>{#if $userName != ''}<span>!</span>{/if}
		</h1>
	</button>
	<div class="searchBox">
		<input class="searchInput" placeholder="SEARCH THE WORLD" bind:value={$searchInput} on:keyup={debouncedHandleClick} on:keydown={handleDown} />
		{#if $searchInput === ''}
			<button class="searchButton" style={$isFlex === true ? 'opacity:var(--extraDull);' : 'opacity:0;'} disabled>
				<i class="fa fa-magnifying-glass-location" />
			</button>
		{/if}
	</div>
	<!-- <div class="absoluteBox"> -->
	<button class="absoluteBox icon" on:click={toggle}>
		{#if $nature === 'PUBLIC'}
			<i class="fa fa-user-o pad" />
		{:else if $nature === 'HASHTAG'}
			<i class="fa fa-hashtag" />
		{:else if $nature === 'LOCATION'}
			<i class="fa fa-location-pin pad" />
		{/if}
	</button>
	<!-- </div> -->
</div>

<style>
	.icon {
		scale: 1.4;
	}
	.fa-hashtag {
		color: var(--primary);
	}
	.fa-location-pin {
		color: var(--secOptDark);
	}
	.fa-user-o {
		color: var(--secondary);
	}

	.searchInput {
		width: 85%;
		height: 10px;
		background-color: var(--secondaryTheme);
		box-shadow: var(--boxInsetShadows);

		/* padding: 2px 6px; */

		height: 20px;

		border-radius: calc(var(--borderRadius) / 3);
		margin-left: calc(var(--averageMargin) * -0.25);

		color: var(--tertiaryThemeInverted);
		padding-top: 3px;
		padding-bottom: 3px;
		/* padding: 1rem; */
		padding-left: calc(var(--averageMargin) * 1);

		font-family: UBold;
	}

	.searchInput::placeholder {
		color: var(--primaryThemeInverted);
		opacity: var(--extraDull);
		font-family: UBold;

		padding-left: calc(var(--averageMargin) * 2);
	}
	.searchBox {
		position: relative;

		bottom: 14px;
		right: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;

		height: 20px;
		width: 100%;

		/* margin-left: calc(var(--averageMargin) * -0.5); */
	}
	.searchButton {
		position: absolute;
		left: calc(var(--averageMargin) * 3);
		top: 0;
		height: 100%;
		width: 20px;
		background-color: transparent;
		color: var(--secondaryThemeInverted);

		pointer-events: none;

		transition: opacity 50ms ease-in-out;
	}
	.headerText {
		font-family: Imprima;
		color: var(--primary);
		font-size: calc(var(--fontSize) * 1.2);
		padding: calc(var(--averageMargin) + 3px);
	}

	.topHeaderLeft {
		position: relative;
		height: 100%;
		width: 100%;
		background: var(--primaryTheme);

		border-bottom-left-radius: var(--borderRadius);

		/* box-shadow: var(--boxShadows); */

		overflow: visible;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
	}
	.textBox {
		width: max-content;
		height: max-content;
		padding-left: var(--averageMargin);
		background-color: transparent;
		margin: 0;
		display: flex;
		align-items: flex-start;
	}
	@media screen and (max-width: 768px) {
		.topHeaderLeft {
			border-bottom-right-radius: var(--borderRadius);
			margin: 0;
		}
		.absoluteBox {
			right: var(--averageMargin);
		}
	}
	@media screen and (min-width: 1410px) {
		.topHeaderLeft {
			border-top-left-radius: calc(var(--borderRadius) / 1.5);
			overflow: hidden;
		}
	}
</style>
