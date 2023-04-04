<script>
	import { debounce } from '$lib/bigFunctions/debounce';
	import { nature } from '$lib/stores/nature';
	import { onDestroy, onMount } from 'svelte';

	const setlocalStorage = () => {
		localStorage.setItem('nature', JSON.stringify({ $nature }));
	};
	const debouncedSetlocalStorage = debounce(setlocalStorage, 300);
</script>

<div class="navBoxy">
	<div class="nav nav1 {$nature === 'PUBLIC' ? 'selectedNav' : 'unselectedNav'}">
		<button
			on:click={() => {
				$nature = 'PUBLIC';
				debouncedSetlocalStorage();
				const middleData = document.querySelector('.middleData');
				middleData?.scrollTo(0, 0);
			}}
			class="fa fa-user-o navContainer"
			style={$nature === 'PUBLIC' ? '' : 'color:var(--primaryTheme'}
			><div class="childLine {$nature === 'PUBLIC' ? 'childTranslated' : ''}" />
		</button>
	</div>
	<div class="nav nav2 {$nature === 'HASHTAG' ? 'selectedNav' : 'unselectedNav'}">
		<button
			on:click={() => {
				$nature = 'HASHTAG';
				debouncedSetlocalStorage();

				const middleData = document.querySelector('.middleData');
				middleData?.scrollTo(0, 0);
			}}
			class="fa fa-hashtag navContainer"
			style={$nature === 'HASHTAG' ? '' : 'color:var(--primaryTheme'}><div class="childLine {$nature === 'HASHTAG' ? 'childTranslated' : ''}" /></button>
	</div>
	<div class="nav nav3 {$nature === 'LOCATION' ? 'selectedNav' : 'unselectedNav'}">
		<button
			on:click={() => {
				$nature = 'LOCATION';
				debouncedSetlocalStorage();

				const middleData = document.querySelector('.middleData');
				middleData?.scrollTo(0, 0);
			}}
			class="fa fa-location-pin navContainer"
			style={$nature === 'LOCATION' ? '' : 'color:var(--primaryTheme'}><div class="childLine {$nature === 'LOCATION' ? 'childTranslated' : ''}" /></button>
	</div>
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

	.fa {
		font-size: clamp(1rem, 6vw, 1.5rem);
	}
	.navBoxy {
		height: 100%;
		width: 100%;

		display: flex;
		align-items: flex-end;
		justify-content: space-evenly;

		pointer-events: all;
	}

	.nav {
		height: 100%;
		width: 30%;
		transition: all 100ms ease-in-out;

		display: flex;
		align-items: center;
		justify-content: center;
	}
	.selectedNav {
		height: 140%;
		border-radius: var(--smallerBorderRadius) var(--smallerBorderRadius) 0 0;
		background-color: var(--primaryTheme);
		border: 1px solid var(--tertiaryThemeInverted);
		border-bottom: 0;
	}
	.unselectedNav {
		background-color: var(--secondaryTheme);
		height: 100%;
		border-radius: var(--smallerBorderRadius) var(--smallerBorderRadius) 0 0;
		border: 1px solid var(--tertiaryThemeInverted);
		border-bottom: 0;
	}

	.childTranslated {
		position: absolute;
		top: 0;
		animation: Cslide 250ms both ease-in-out;
		background-color: var(--secondry);
		width: 100%;
	}
	@keyframes Cslide {
		0% {
			height: 0vh;
		}
		40% {
			height: 0.4vh;
		}
		66% {
			height: 1.2vh;
		}
		100% {
			height: 1vh;
		}
	}
	.navContainer {
		width: 100%;
		height: 100%;
		border-radius: var(--smallerBorderRadius) var(--smallerBorderRadius) 0 0;
		box-shadow: var(--boxInsetShadowsInverted);

		display: flex;
		flex-direction: column-reverse;

		position: relative;

		overflow: hidden;

		align-items: center;
		justify-content: center;

		background-color: transparent;

		transition: all 300ms ease-in-out;
	}
</style>
