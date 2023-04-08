<script lang="ts">
	import { currentLayoutPage } from '$lib/stores/currentLayoutPage';
	import { fullDisplay } from '$lib/stores/fullDisplay';
	import { isFlex } from '$lib/stores/isFlex';
	import { isLocked } from '$lib/stores/isLocked';
	import { userName } from '$lib/stores/userName';
	import { user_message } from '$lib/stores/user_message';

	import { nature } from '$lib/stores/nature';
	import { searchInput } from '$lib/stores/searchInput';
	import { locationPrediction } from '$lib/stores/locationPrediction';
	import { json } from '@sveltejs/kit';
	import { onDestroy, onMount } from 'svelte';
	import { searchData } from '$lib/stores/searchData';
	import { debounce } from '$lib/bigFunctions/debounce';

	$: $searchInput = $searchInput
		.replace(/\s/g, '-')
		.replace(/[^a-zA-Z0-9-]/g, '')
		.toLowerCase()
		.replace(/-+/g, '-');

	let name = 'world';

	const toggle = (e: any) => {
		$fullDisplay = 'nonHidden';

		if (window.location.pathname === '/') {
			$isFlex = !$isFlex;
			return;
		}

		setTimeout(() => {
			$fullDisplay = 'hidden';
		}, 600);
	};

	let response: any;
	function handleDown(event: any) {
		if (event.key === 'Tab' || event.key === 'Meta' || event.ctrlKey || event.key === 'Shift') {
			event.preventDefault();
		} else {
			$locationPrediction = [
				{
					description: '#',
					structured_formatting: {
						main_text: '',
						secondary_text: 'LOADING...',
					},
					types: [],
				},
			];
		}
	}

	const debouncedHandleClick = debounce(handleClick, 1000);

	async function handleClick(event: any) {
		const service = new google.maps.places.AutocompleteService();

		try {
			const predictions = service.getPlacePredictions({ input: $searchInput }).then((predictions: any) => {
				$locationPrediction = predictions.predictions;
			});
		} catch (e) {
			console.log(e);
		}

		const searchInputData: any = $searchInput.trim();
		if ($searchInput != '') {
			const res = await fetch('/api/searchData', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ searchInputData }),
			});
			const response = await res.json();
			$searchData = response.data;

			if (!res.ok) {
				alert('failed to search data');
				alert(response.message);
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
			];
		}
	}
</script>

<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

<div class="topHeaderLeft">
	<button
		class="textBox"
		on:click={() => {
			$isLocked = !$isLocked;
		}}>
		<h1 class="headerText" style={$nature === 'LOCATION' ? 'color: var(--secOptDark)' : 'color: var(--primary);'}>
			<span style="color: var(--secondary)">wassup </span><span>{$userName}</span>{#if $userName != ''}<span>!</span>{/if}
		</h1>
	</button>
	<div class="searchBox">
		<input class="searchInput" placeholder="SEARCH THE WORLD 👀" bind:value={$searchInput} on:keyup={debouncedHandleClick} on:keydown={handleDown} />
		{#if $searchInput === ''}
			<button class="searchButton" style={$isFlex === true ? 'opacity:var(--extraDull);' : 'opacity:0;'} disabled>
				{#if $nature === 'PUBLIC'}
					<i class="fa fa-user-o" />
				{:else if $nature === 'HASHTAG'}
					<i class="fa fa-hashtag" />
				{:else if $nature === 'LOCATION'}
					<i class="fa fa-location-pin" />
				{/if}
			</button>
		{/if}
	</div>
	<!-- <button class="absoluteBox icon" on:click={toggle}> -->
	<a href="/" class="absoluteBox icon" on:click={toggle}>
		{#if $nature === 'PUBLIC'}
			<i class="fa-regular fa-heart" style="color:var(--secondary)" />
		{:else if $nature === 'HASHTAG'}
			<i class="fa fa-couch" style="color:var(--primary)" />
		{:else if $nature === 'LOCATION'}
			<i class="fa-solid fa-globe" style="color:var(--secOptDark)" />
		{/if}
	</a>
</div>

<style>
	.fa {
		color: var(--tertiaryThemeInverted);
		animation: zoomIn 100ms ease-in-out both;
	}
	.fa-couch {
		text-shadow: 0 0 10px var(--primary);
	}
	.fa-heart {
		text-shadow: 0 0 10px var(--secondary);
	}
	.fa-globe {
		text-shadow: 0 0 10px var(--secOptDark);
	}
	.fa-couch,
	.fa-heart,
	.fa-globe {
		animation: zoomIn 100ms ease-in-out both;
	}
	.icon {
		scale: 0.9;
		padding: 01rem;
		top: var(--averageMargin);

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.searchInput {
		width: calc(100% - 2 * var(--averageMargin));
		margin: var(--averageMargin);
		height: 10px;
		background-color: var(--secondaryTheme);
		box-shadow: var(--boxInsetShadows);

		height: 20px;

		border-radius: calc(var(--borderRadius) / 1);
		border: 1px solid var(--secondaryThemeInverted);

		color: var(--primaryThemeInverted);
		padding-top: 3px;
		padding-bottom: 3px;
		padding-left: var(--averageMargin);

		font-family: UBold;
		transition: border-radius 400ms ease-in-out, border 500ms ease-in-out;
	}
	.searchInput:active,
	.searchInput:focus {
		border-radius: calc(var(--borderRadius) / 2);
		border: 1px solid var(--secondary);
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
	}
	.searchButton {
		position: absolute;
		left: 0;
		margin-left: calc(var(--averageMargin) * 2);
		top: 0;
		height: 100%;
		width: calc(var(--averageMargin) * 1.5);
		color: var(--secondaryThemeInverted);

		pointer-events: none;

		transition: opacity 50ms ease-in-out;
	}
	.headerText {
		font-family: Imprima;
		font-size: calc(var(--fontSize) * 1.2);
		padding: calc(var(--averageMargin) + 3px);
		transition: color 300ms ease-in-out;
		-webkit-text-stroke: 0.1px black;
	}

	.topHeaderLeft {
		position: relative;
		height: 100%;
		width: 100%;
		background-color: var(--primaryTheme);

		border-bottom-left-radius: var(--borderRadius);
		overflow: hidden;

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
