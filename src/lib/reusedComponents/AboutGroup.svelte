<script lang="ts">
	import { isShowInfo } from '$lib/stores/isShowInfo'
</script>

<div class="infoBox" style={$isShowInfo ? 'scale: 1; opacity:1;' : 'scale: 0; padding:.2rem;margin-top:-2rem;margin-bottom:-6rem; opacity:0;'}>
	<div class="infoData">
		<h1 class="comingSoon">Working on the mechanics to make it the best social-app ever designed/engineered.</h1>
	</div>
</div>

<style>
	.infoBox {
		width: 100%;
		height: max-content;
		margin-right: -6px;
	}
	.infoData {
		height: 100px;
		width: calc(100%-1rem);
		background-color: var(--secondaryTheme);
		box-shadow: var(--boxShadows);
		border: 0.3px solid var(--secondaryThemeInverted);

		border-radius: var(--borderRadius);

		margin: var(--averageMargin);

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
