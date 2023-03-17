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
	<title>Wassup.World - Location-Based Chat App</title>
	<meta name="description" content="OPEN-SOURCE CHAT-APP" />
</svelte:head>

<div class="middleScroll">
	<div class="slot">
		<div class="buttonIcon"><button class="logoImage" on:click={showInfo}><img class="logo" src={imageLogoSrc} alt="Logo" /></button></div>
		<div class="Info" style={isShowInfo ? 'scale: 1; opacity:1;' : 'scale: .75; padding:.2rem;margin-top:-2rem; opacity:0;'}>
			<div class="headerText">
				<h1 style="color:var(--primary);font-family: UBold;"><span>HEY </span><span>{$userName.toUpperCase()}!</span></h1>
				<br />
			</div>
			<div class="headerText">
				<p class="pWIdth">Welcome to the app, let me tell you more about the app,</p>
				<br />
				<p class="pWIdth">Wassup.World is a unique and innovative chat app that is location-based, allowing users to connect with people in their area in real-time. With its unique barcode system, users can easily join chat rooms specific to restaurants, making it the perfect app for foodies who want to connect with like-minded individuals.</p>
				<br />
				<p class="pWIdth">But Wassup.World is more than just a foodie chat app. It also has a powerful hashtag system that lets users create and discover discussions on a wide range of topics, including cooking, fitness, and more. Users can even have private conversations with each other, allowing for more intimate and personalized interactions.</p>
				<br />
				<p class="pWIdth">With its user-friendly interface and diverse range of features, Wassup.World is the perfect app for anyone looking to connect with people in their local community or around the world. So why wait? Download Wassup.World today and start chatting!</p>
				<br />
				<p class="pWIdth" />
			</div>
		</div>
	</div>
</div>

<style>
	.pWIdth {
		width: clamp(400px, 60vw, 600px);
	}
	.buttonIcon {
		height: fit-content;
	}
	.headerText {
		font-family: Imprima;
		text-shadow: var(--boxShadows);
		text-align: start;
		color: var(--tertiaryThemeInverted);

		width: 80%;
		height: fit-content;
	}
	.Info {
		transition: scale 333ms ease-in-out, padding 266ms ease-in-out, margin-top 266ms ease-in-out, opacity 266ms ease-in-out;
		width: max-content;
		background-color: var(--secondaryTheme);
		padding: calc(var(--averageMargin) * 2);
		box-shadow: var(--boxInsetShadowsInverted), var(--boxShadows);

		border-radius: var(--borderRadius);
		margin-top: 1rem;
	}

	/* .Info {
		transition: scale 333ms ease-in-out, padding 266ms ease-in-out, margin-top 266ms ease-in-out, opacity 266ms ease-in-out;
		width: 80%;
		height: fit-content;

		background: var(--secondaryTheme);
		box-shadow: var(--boxInsetShadowsInverted), var(--boxShadows);
		border: var(--primaryTheme);
		padding: 1rem;
		margin-top: 1rem;
		margin-bottom: 1rem;

		border-radius: var(--borderRadius);

		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;

		overflow: hidden;
		z-index: 1;
	} */
	.logo {
		scale: 0.21;
	}
	.logoImage {
		transition: scale 333ms ease-in-out, box-shadow 333ms ease-in-out, background-color 333ms ease-in-out;
		height: 100px;
		width: 100px;

		border-radius: var(--borderRadius);
		box-shadow: var(--boxNeoShadows);

		background-color: var(--secondaryTheme);
		margin-top: var(--averageMargin);
		padding: 0;

		/* background-color: var(--red); */

		display: flex;
		justify-content: center;
		align-items: center;

		overflow: hidden;
	}
	.logoImage:hover {
		scale: 1.1;
		background-color: var(--primaryTheme);
		box-shadow: var(--boxShadows);
		cursor: pointer;
	}
	.logoImage:active,
	.logoImage:focus {
		scale: 0.9;
		box-shadow: var(--boxInsetShadows);
		cursor: pointer;
	}
	.middleScroll {
		height: 80%;
		width: 100%;
		overflow: hidden;

		overflow-y: scroll;
	}

	.slot {
		/* height: 100%; */
		margin-bottom: var(--averageMargin);
		width: 100%;
		display: flex;
		justify-content: start;
		align-items: center;
		flex-direction: column;

		margin-top: calc(var(--averageMargin) * 9);

		/* position: absolute;
		bottom: 0;
		left: 0; */

		padding: 1rem 0;
	}

	@media screen and (max-width: 768px) {
	}

	@media screen and (min-width: 1410px) {
	}
</style>
