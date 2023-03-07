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
		.replace(/\s/g, '-')
		.replace(/[^a-zA-Z0-9-]/g, '')
		.toLowerCase()

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
	// const handleClick = () => {
	// 	if ($searchInput != '') {
	// 		// searchGET({ searchData: $searchInput })
	// 		console.log(response)

	// 		try {
	// 			response = json(res)
	// 			console.log('res')
	// 			console.log(res)
	// 		} catch (e) {
	// 			console.log(e)
	// 		}

	// 		const service = new google.maps.places.AutocompleteService()

	// 		console.log(service)
	// 		try {
	// 			const predictions = service.getPlacePredictions({ input: $searchInput }).then((predictions: any) => {
	// 				$locationPrediction = predictions.predictions
	// 			})
	// 		} catch (e) {
	// 			console.log(e)
	// 		}
	// 	}
	// }
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

	async function handleClick(event: any) {
		if ($searchInput != '') {
			const res = await fetch('/api/searchData', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ data: $searchInput }),
			})
			const response = await res.json()
			$searchData = response.data

			if (!res.ok) {
				alert('failed to search data')
				alert(response.message)
			}

			const service = new google.maps.places.AutocompleteService()

			try {
				const predictions = service.getPlacePredictions({ input: $searchInput }).then((predictions: any) => {
					$locationPrediction = predictions.predictions
				})
			} catch (e) {
				console.log(e)
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
	<div class="searchBox"><input class="searchInput" placeholder="search" bind:value={$searchInput} on:keyup={handleClick} on:keydown={handleDown} /></div>
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

		border-radius: var(--borderRadius);
		margin-left: calc(var(--averageMargin) * -0.25);

		color: var(--tertiaryThemeInverted);
		padding-left: calc(var(--averageMargin) * 2);

		font-family: UBold;
	}

	.searchInput::placeholder {
		color: var(--primaryThemeInverted);
		opacity: var(--extraDull);
		font-family: ULight;
	}
	.searchBox {
		position: absolute;
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

		box-shadow: var(--boxShadows);

		overflow: visible;
	}
	.textBox {
		width: 435px;
		height: 100%;
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
