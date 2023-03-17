<script>
	import { currentPage } from '$lib/stores/currentPage'
	import { userName } from '$lib/stores/userName'
	import { onMount } from 'svelte'
	import { autoresize } from 'svelte-textarea-autoresize'

	import imageLogoSrc from '$lib/assets/fknLatest.png'
	import { currentGroupName } from '$lib/stores/currentGroupName'
	import { currentGroupCreatedAt } from '$lib/stores/currentGroupCreatedAt'

	let isShowInfo = false

	function showInfo() {
		isShowInfo = !isShowInfo
	}

	onMount(() => {
		$currentPage = ''
		$currentGroupName = 'HOME'
	})
</script>

<svelte:head>
	<title>Wassup.World - Location-Based Chat App</title>
	<meta name="description" content="OPEN-SOURCE CHAT-APP" />
</svelte:head>

<div class="middleScroll">
	<div class="slot">
		<div class="buttonIcon" style={isShowInfo ? 'margin-top:0rem' : 'margin-top:10rem'}><button class="logoImage" on:click={showInfo}><img class="logo" src={imageLogoSrc} alt="Logo" /></button></div>
		<div class="Info" style={isShowInfo ? 'scale: 1; opacity:1;' : 'scale: .75; padding:.2rem;margin-top:-2rem; opacity:0;'}>
			<div class="headerText">
				<h1 style="color:var(--primary);font-family: UBold;"><span>HEY </span><span>{$userName.toUpperCase()}!</span></h1>
				<br />
			</div>
			<div class="headerText">
				<p class="pWidth">Welcome to the app, let me tell you more about the app,</p>
				<br />
				<p class="pWidth">Wassup.World is a unique and innovative chat app that is location-based, allowing users to connect with people in their area in real-time. With its unique barcode system, users can easily join chat rooms specific to restaurants, making it the perfect app for foodies who want to connect with like-minded individuals.</p>
				<br />
				<p class="pWidth">But Wassup.World is more than just a foodie chat app. It also has a powerful hashtag system that lets users create and discover discussions on a wide range of topics, including cooking, fitness, and more. Users can even have private conversations with each other, allowing for more intimate and personalized interactions.</p>
				<br />
				<p class="pWidth">With its user-friendly interface and diverse range of features, Wassup.World is the perfect app for anyone looking to connect with people in their local community or around the world. So why wait? Download Wassup.World today and start chatting!</p>
				<br />
				<ul class="pWidth" style="margin-left: -20px;">
					<li><span style="font-weight: bold;">Location-based chat app:</span> Wassup.World allows users to connect with others in their local community in real-time.</li>
					<br />
					<li><span style="font-weight: bold;">Barcode system:</span> Users can easily join chat rooms specific to restaurants by scanning barcodes.</li>
					<br />
					<li><span style="font-weight: bold;">Hashtag system:</span> Users can create and discover discussions on a wide range of topics using hashtags.</li>
					<br />
					<li><span style="font-weight: bold;">Private conversations:</span> Users can have private conversations with each other, allowing for more intimate and personalized interactions.</li>
					<br />
					<li><span style="font-weight: bold;">User-friendly interface:</span> The app has a user-friendly interface that is easy to use and navigate.</li>
					<br />
					<li><span style="font-weight: bold;">Diverse range of features:</span> Wassup.World has a range of features, from foodie chat rooms to fitness discussions, making it suitable for a wide range of interests.</li>
					<br />
					<li><span style="font-weight: bold;">Connecting with like-minded individuals:</span> The app allows users to connect with others who share similar interests and passions, creating a sense of community.</li>
					<br />
					<li><span style="font-weight: bold;">Available worldwide:</span> Wassup.World can be used by people around the world, making it a great tool for connecting with people from different cultures and backgrounds.</li>
					<br />
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.pWidth {
		width: clamp(300px, 60vw, 700px);
	}
	.buttonIcon {
		height: fit-content;
		transition: margin-top 333ms ease-in-out;
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
		height: 100%;
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
