<script>
	import imgSource from '$lib/assets/menuItems.jpg';
	import { currentPage } from '$lib/stores/currentPage';

	const uSplashKeys = [
		'U7HLzMO4SIY',
		'ukzHlkoz1IE',
		'GyV6SL_fKsI',
		'IB5bld_weak',
		'dZxQn4VEv2M',
		'RygIdTavhkQ',
		'W3SEyZODn8U',
		'249DzAuJTqQ',
		'NYrVisodQ2M',
		'fIHozNWfcvs',
		'F2KRf_QfCqw',
		'I9j8Rk-JYFM',
		'hw_sKmjb0ns',
		'6ciLddToTgM',
		'xI_-wFJhCiM',
		'_qADvinJi20',
		'N3TypD-awJQ',
		'gj7BLlSzIFs',
		'5xltWMpkN3E',
		'PblvRWusYWA',
		'GXXYkSwndP4',
		'VdRex9AiBOc',
		'jnPX_eCrCOk',
		's9DmLgLdugg',
		'WyDLo5GmDRU',
		'zlABb6Gke24',
		'_HXFz-0g9w8',
		'HjWzkqW1dgI',
		'UrQ_BS9bLXQ',
		'P7-_EB3gQuA',
		'9P1pZy3gwxg',
		'rdZP-I12iuc',
		'3yiaqDO8kIE',
		'H7xTpvBjJS4',
		'yhn4okt6ci0',
		'z4aFfchLht4',
		'LNifVC0ja8s',
		'1BEAIg-79H0',
		'Hus_fjCI6gg',
		'R25Q-pAUeY8',
		'wnX-fXzB6Cw',
		'wHLTo7uLaxk',
		'ugaOk9LkmQY',
		'UCbMZ0S-w28',
		'oTxlt30a4KQ',
		'0bZNGLbTKvo',
		'i2hfu0fcfus',
		'8Gb7AgOzjMA',
		'cYrMQA7a3Wc',
		'5eg5e0BlYQg',
		'LNdpi8Yzi34',
		'iI4sR_nkkbc',
		'7__6lSyuYeA',
		'd30sszrW7Vw',
		'6g9BxgCNQv4',
	];
	const randomKey = uSplashKeys[Math.floor(Math.random() * uSplashKeys.length)];
	const imgUrl = 'https://source.unsplash.com/' + randomKey;

	export let active = 0;
	let i = 0;

	export let groupAdData = {
		isClient: false,
		currentListing: [],
	};
	let currentListing = {};

	if (groupAdData.isClient === true) {
		$currentPage = 'LOCATIONS';
		currentListing = groupAdData.clientListing[0].item;
	}

	let isShowMenu = false;
	const isShowMenuToggle = () => {
		isShowMenu = !isShowMenu;
	};
</script>

{#if $currentPage === 'LOCATIONS' && groupAdData.isClient === true}
	{#if !isShowMenu}
		<div class="pTextAdContainer">
			<button class="replyBox">
				<!-- <img src={imgUrl} alt="image {active + 1}" class="image" /> -->
				<div class="buttonWindowMng">
					{#each groupAdData.clientListing as { item, itemImages }, i}
						<!-- last header -->
						<button
							on:click={() => {
								isShowMenuToggle();
								currentListing = { item };
							}}
							class="headerDiv"
							style={i === groupAdData.clientListing.length - 1 ? 'border-right: none' : ''}>
							<div class="gradient adBoxGrad" />
							<h1 class="itemHeader">{item.toLowerCase()}</h1>
							<img src={itemImages[Math.floor(Math.random() * itemImages.length)]} alt="image {active + 1}" class="absMenuClass" />
						</button>
					{/each}
				</div>
			</button>
		</div>
	{:else}
		<div class="pTextAdContainer">
			<div class="navHeader">
				{#each groupAdData.clientListing as { item }}
					<button
						on:click={() => {
							currentListing = { item };

							const adWindow = document.getElementById('adWindow');
							if (adWindow) {
								setTimeout(() => {
									adWindow.scrollTo({ top: 0, behavior: 'smooth' });
								}, 100);
							}
						}}
						class="navItem">{item.toUpperCase()}</button>
				{/each}
			</div>
			<div class="fullWindow" id="adWindow">
				<!-- <img src={imgUrl} alt="image {active + 1}" class="image" />
				<img src={imgUrl} alt="image {active + 1}" class="image" /> -->
				<button
					on:click={() => {
						isShowMenuToggle();
						// scroll to top id: adWindow
					}}
					class="navItemsList">
					{#each groupAdData.clientListing as { item, itemImages }}
						{#if item === currentListing.item}
							{#each itemImages as img}
								<img src={img} alt="image {active + 1}" class="image navItemsImg" />
							{/each}
						{/if}
					{/each}
					<div class="bottomNavSpace" />
				</button>
				<!-- <div class="navHeader">
					{#each groupAdData.clientListing as { item }}
						<button
							on:click={() => {
								currentListing = { item };
							}}
							class="navItem">{item.toUpperCase()}</button>
					{/each}
				</div> -->
			</div>
		</div>
	{/if}

	<div class="aboutWallpaper">
		<div class="gradient" />
		<img src={groupAdData.Theme} alt="image {active + 1}" class="imgWallpaper" />
		<!-- <img src={groupAdData.Theme} alt="image {active + 1}" class="imgWallpaper" /> -->
		<div class="paddingBottom" />
	</div>
{/if}

<style>
	.bottomNavSpace {
		height: 79px;
		width: 100%;
	}
	.navItemsList {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		/* transform: translateY(-50%); */

		/* margin-top: var(--averageMargin); */
	}
	.navItemsImg {
		margin-bottom: var(--averageMargin);
	}
	.navHeader {
		/* position: absolute; */
		/* z-index: 1000000; */
		width: 100%;
		height: 50px;
		margin: var(--averageMargin) 0;
		margin-top: var(--lessAverageMargin);

		display: flex;
		align-items: center;
		justify-content: center;

		position: absolute;
		bottom: 69px;
		z-index: 4;
	}
	.navItem {
		display: flex;
		align-items: center;
		justify-content: center;
		width: max-content;
		height: 45px;
		background-color: var(--primaryTheme);
		border-radius: var(--borderRadius);
		padding: 30px 40px;
		margin: var(--averageMargin);
		/* margin-bottom: ; */
		box-shadow: var(--boxShadows);

		color: var(--primaryThemeInverted);
		font-family: UBold;
		font-size: 2rem;
	}
	.navItem:hover {
		background-color: var(--primaryThemeInverted);
		color: var(--primaryTheme);
	}
	.absMenuClass {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
		/* transform: translateY(-225%); */
	}
	.itemHeader {
		z-index: 400;
		font-size: calc(var(--fontSize) * 1.69);
		color: var(--secondaryTheme);
		/* background-color: var(--optDark); */
		padding: var(--averageMargin) calc(var(--averageMargin) * 2);
		border-radius: var(--borderRadius);
		text-shadow: none;
		/* filter: drop-shadow(0px 0px 2px var(--primaryTheme)); */
		box-shadow: var(--boxShadowsBlur), var(--boxShadows);
		transition: all 0.2s ease-in-out;

		filter: drop-shadow(0px 0px 69px var(--primaryTheme));
		border: 1px solid var(--tertiaryThemeInverted);
	}
	.itemHeader:hover {
		color: var(--primaryThemeInverted);
		background-color: #0007;
		box-shadow: var(--boxInsetShadows);
		border: 1px solid var(--tertiaryTheme);
	}

	.buttonWindowMng {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		/* margin-right: -10px; */
	}
	.headerDiv {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		overflow: hidden;

		z-index: 1;
		font-family: UBold;
		position: relative;
		border-right: 1px solid var(--tertiaryThemeInverted);

		box-shadow: 0px 0px 10000px 100px inset var(--secondaryTheme);
	}
	.gradient {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 105%;
		width: 100%;
		z-index: 10000;
		background-image: linear-gradient(0deg, var(--secondaryTheme) 33%, #0000 100%), linear-gradient(180deg, var(--secondaryTheme) 0%, #0000 40%);

		pointer-events: none;
	}
	.adBoxGrad {
		z-index: 2;
		background-image: linear-gradient(33deg, var(--secondaryTheme) 00%, #0000 100%), linear-gradient(-147deg, var(--primaryTheme) 0%, #0000 100%);
		opacity: 0.69;
	}
	.imgWallpaper {
		height: auto;
		width: 100%;
		filter: blur(0.3px);
		opacity: 0.69;
	}
	.aboutWallpaper {
		position: absolute;

		top: 90px;
		left: 0;
		right: 0;
		height: max-content;
		width: 100%;
		z-index: 10000;

		pointer-events: none;
		z-index: 0;

		display: flex;
		align-items: start;
		justify-content: center;
	}
	.fullWindow {
		width: calc(100% - 2 * var(--averageMargin));
		height: calc(100% - 175px);
		position: absolute;
		top: 100px;
		z-index: 1;
		padding: 0 calc(var(--averageMargin));
		padding-top: var(--averageMargin);

		display: flex;
		align-items: start;
		justify-content: start;
		flex-direction: column;

		overflow: hidden;
		overflow-y: scroll;
	}

	::-webkit-scrollbar {
		display: none;
	}
	.image {
		width: 100%;

		border-radius: var(--borderRadius);
		box-shadow: var(--boxShadows);
		pointer-events: all;
	}
	.pTextAdContainer {
		display: flex;
		justify-content: start;
		align-items: center;
		z-index: 2;

		width: 100%;
		height: clamp(0px, 100%, 176px);

		padding: calc(var(--averageMargin) * 1.2) 0;
	}

	.replyBox {
		border-radius: var(--borderRadius);
		color: var(--primaryThemeInverted);
		overflow: hidden;
		border: 01px solid var(--tertiaryThemeInverted);

		font-size: 1rem;
		opacity: 1;
		width: calc(100% - calc(var(--averageMargin) * 2));
		margin: calc(var(--averageMargin) * 2) var(--averageMargin);

		width: 100%;
		height: 176px;
		background-color: var(--primaryTheme);
		display: flex;
		align-items: center;
		justify-content: center;

		position: relative;
		box-shadow: var(--boxShadowsBlur), var(--boxInsetShadows);
	}
</style>
