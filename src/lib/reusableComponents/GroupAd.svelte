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

	let isShowMenu = false;
	const isShowMenuToggle = () => {
		isShowMenu = !isShowMenu;
	};
	// const useGpay = () => {
	// 	console.log('gPayed');
	// };
</script>

{#if $currentPage === 'LOCATIONS'}
	<div class="pTextAdContainer">
		<button on:click={isShowMenuToggle} class={isShowMenu ? 'fullWindow' : 'replyBox'}>
			<img src={imgUrl} alt="image {active + 1}" class="image" />
			<!-- {#if isShowMenu}
				<div class="paymentDiv">
					<div class="payContainer">
						<div class="payText">
							<h1>Pay using Google Pay</h1>
							<p>You can pay using Google Pay. You can also pay using your credit card by clicking the button below.</p>
						</div>
						<div class="payButton">
							<buttonclass="payButton">Pay</button>
						</div>
					</div>
				</div>
			{/if} -->
		</button>
	</div>
	{#if !isShowMenu}
		<div class="aboutWallpaper">
			<div class="gradient" />
			<img src={imgUrl} alt="image {active + 1}" class="imgWallpaper" />
			<div class="paddingBottom" />
		</div>
	{/if}
{/if}

<style>
	.paymentDiv {
		/* position: absolute; */
		/* bottom: 0; */
		/* z-index: 100001; */
		/* height: calc(176px - calc(var(--averageMargin) * 2)); */
		height: 100%;
		width: 100%;
		background-color: var(--primaryTheme);
		margin-top: var(--averageMargin);
		border-radius: var(--borderRadius);
		/* overflow: hidden; */
		box-shadow: var(--boxShadows);
		/* width: calc(100% - calc(var(--averageMargin) * 2)); */
	}
	.payContainer {
		display: flex;
		flex-direction: column;
		justify-content: start;
		height: 176px;
		padding: 1rem;
		width: calc(100% - calc(var(--averageMargin) * 3));
		line-break: anywhere;
	}
	.gradient {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 105%;
		width: 100%;
		z-index: 10000;
		/* background-image: linear-gradient(to bottom, #0000, var(--secondaryTheme)); */
		background-image: linear-gradient(0deg, var(--secondaryTheme) 33%, #0000 100%), linear-gradient(180deg, var(--secondaryTheme) 0%, #0000 40%);

		pointer-events: none;
	}
	.imgWallpaper {
		height: auto;
		width: 100%;
		/* filterBlur */
		filter: blur(1px);
		/* object-fit: cover; */
	}
	.aboutWallpaper {
		position: absolute;

		top: 90px;
		left: 0;
		right: 0;
		height: max-content;
		width: 100%;
		z-index: 10000;
		opacity: 0.33;
		/* background-image: linear-gradient(to bottom, #000, red); */
		/* foreground lineargradient */

		pointer-events: none;
		z-index: 0;

		display: flex;
		align-items: start;
		justify-content: center;
	}
	.fullWindow {
		width: 100%;
		height: calc(100% - 175px);
		/* height: 100%; */
		position: absolute;
		top: 100px;
		z-index: 10000;
		padding: 0 calc(var(--averageMargin));
		padding-bottom: var(--averageMargin);
		padding-top: var(--averageMargin);

		/* border-radius: var(--borderRadius); */

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

		/* height: fit-content; */

		/* height: 200px; */

		padding: calc(var(--averageMargin) * 1.2) 0;
	}

	.replyBox {
		border-radius: var(--borderRadius);
		color: var(--primaryThemeInverted);
		overflow: hidden;
		/* overflow-y: scroll; */

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

	.box {
		width: 100%;
		/* margin: 0.5em; */
		white-space: normal;
		font-size: 1.5rem;
	}

	.auto {
		line-break: auto;
	}
</style>
