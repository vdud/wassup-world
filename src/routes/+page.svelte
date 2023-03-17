<script>
	import { currentPage } from '$lib/stores/currentPage'
	import { userName } from '$lib/stores/userName'
	import { onMount } from 'svelte'
	import { autoresize } from 'svelte-textarea-autoresize'

	import imageLogoSrc from '$lib/assets/fknLatest.png'

	let isShowInfo = false

	function showInfo() {
		isShowInfo = !isShowInfo
	}

	onMount(() => {
		$currentPage = ''
	})
</script>

<svelte:head>
	<title>HOME</title>
	<meta name="description" content="OPEN-SOURCE CHAT-APP" />
</svelte:head>

<div class="middleScroll">
	<div class="slot">
		<button class="whiteSpace" on:click={showInfo}><img class="logo" src={imageLogoSrc} alt="Logo" /></button>
		<div class="Info" style={isShowInfo ? 'height: 200px' : 'height: 0px; padding:0rem;margin:-1rem'}>
			<div class="headerText">
				<h1 style="color:var(--secondary);font-family: UBold;"><span>HEY </span><span>{$userName.toUpperCase()}!</span></h1>
				<p style="color:var(--tertiaryThemeInverted)">Thankyou coming here,</p>
				<p style="color:var(--tertiaryThemeInverted)">let me tell you a little bit about the app,</p>
				<p style="color:var(--tertiaryThemeInverted)">This app is created as a open-source project,</p>
				<p style="color:var(--tertiaryThemeInverted)">to make it easy to talk to anyone, anywhere, anytime,</p>
				<p style="color:var(--tertiaryThemeInverted)">and most importantly,</p>
				<p style="color:var(--tertiaryThemeInverted)">Anonmously.</p>
			</div>
		</div>
	</div>
</div>

<style>
	.headerText {
		font-family: Imprima;
		text-shadow: var(--boxShadows);
		/* height: max-content; */
		text-align: start;

		/* display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center; */
	}
	.Info {
		transition: height 333ms ease-in-out, padding 266ms ease-in-out, margin 266ms ease-in-out;
		height: max-content;
		width: max-content;

		background: var(--secondaryTheme);
		box-shadow: var(--boxInsetShadowsInverted);
		border: var(--primaryTheme);
		padding: 1rem;
		margin-top: 1rem;

		border-radius: var(--borderRadius);

		display: flex;
		justify-content: center;
		align-items: flex-start;

		overflow: hidden;
	}
	.logo {
		scale: 0.21;
	}
	.whiteSpace {
		transition: scale 333ms ease-in-out;
		height: 100px;
		width: 100px;

		border-radius: 10px;

		background-color: transparent;
		margin: 0;
		padding: 0;

		/* background-color: var(--red); */

		display: flex;
		justify-content: center;
		align-items: center;

		overflow: hidden;
	}
	.whiteSpace:hover {
		scale: 1.1;
		box-shadow: var(--boxShadows);
		cursor: pointer;
	}
	.whiteSpace:active,
	.whiteSpace:focus {
		scale: 0.9;
		box-shadow: var(--boxInsetShadows);
		cursor: pointer;
	}
	.middleScroll {
		height: 100%;
		width: 100%;
	}

	.slot {
		height: 100%;
		margin-bottom: 2rem;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		position: absolute;
		bottom: 0;
		left: 0;

		padding: 1rem 0;
	}

	@media screen and (max-width: 768px) {
	}

	@media screen and (min-width: 1410px) {
	}
</style>
