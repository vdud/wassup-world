<script>
	import imgSource from '$lib/assets/menuItems.jpg'
	import { currentPage } from '$lib/stores/currentPage'

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
	]
	const randomKey = uSplashKeys[Math.floor(Math.random() * uSplashKeys.length)]
	const imgUrl = 'https://source.unsplash.com/' + randomKey

	export let active = 0
	let i = 0

	let isShowMenu = false
	const isShowMenuToggle = () => {
		isShowMenu = !isShowMenu
	}
</script>

{#if $currentPage === 'LOCATIONS'}
	<div class="pTextAdContainer">
		<button on:click={isShowMenuToggle} class={isShowMenu ? 'fullWindow' : 'replyBox'}>
			<img src={imgUrl} alt="image {active + 1}" class="image" />
		</button>
	</div>
{/if}

<style>
	.absoluteCross {
		position: absolute;
		bottom: 200px;
		right: 0;
		left: 0;
		scale: 5;
		z-index: 1;
		color: var(--secondaryThemeInverted);
	}
	.fullWindow {
		width: calc(100% - 2rem);
		height: calc(100% - 180px);
		/* height: 100%; */
		position: absolute;
		top: 115px;
		z-index: 10000;
		margin: 0 1rem;
		border-radius: var(--borderRadius);

		display: flex;
		align-items: start;
		justify-content: start;

		overflow-y: scroll;

		background-color: var(--secondaryTheme);
	}

	::-webkit-scrollbar {
		display: none;
	}
	.image {
		width: 100%;
		border-radius: var(--borderRadius);
		transform: translateY(0%);
		animation: slideInMargin 5s ease-in-out;
	}
	@keyframes slideInMargin {
		0% {
			transform: translateY(-20%);
		}
		100% {
			transform: translateY(0%);
		}
	}
	.pTextAdContainer {
		display: flex;
		justify-content: start;
		align-items: center;

		width: 100%;
		height: clamp(100px, 100%, 176px);
		/* height: 200px; */

		padding: calc(var(--averageMargin) * 1.2) 0;
	}

	.replyBox {
		color: var(--primaryThemeInverted);

		font-size: 1rem;
		opacity: 0.9;
		border-radius: var(--averageMargin);
		width: calc(100% - calc(var(--averageMargin) * 2));
		margin: calc(var(--averageMargin) * 2) var(--averageMargin);
		overflow: hidden;

		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		position: relative;
		box-shadow: var(--boxShadows);
	}

	@keyframes slide {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>
