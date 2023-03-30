<script lang="ts">
	import { isShowInfo } from '$lib/stores/isShowInfo'
</script>

<div class="infoBox" style={$isShowInfo ? 'scale: 1; opacity:1;' : 'scale: 0; padding:.2rem;margin-top:-2rem;margin-bottom:-6rem; opacity:0;'}>
	<div class="infoData">
		<div class="flexInfo">
			<div class="flex flex1">
				<div class="textBoxH">
					<p>Share 🔗</p>
				</div>
				<div class="shareLogosContainer">
					<div class="colored" />
					<div class="colored" />
					<div class="colored" />
					<div class="colored" />
				</div>
			</div>
			<div class="flex flex2">
				<div class="textBoxH"><p>GroupMembers;</p></div>
				<div class="peopleList">
					<div class="color" />
					<div class="color" />
					<div class="color" />
					<div class="color" />
					<div class="color" />
					<div class="color" />
					<div class="color" />
					<div class="color" />
					<div class="color" />
					<div class="color" />
					<div class="color" />
					<div class="color" />
					<div class="color" />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.shareLogosContainer {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
	}
	.colored {
		width: 100%;
		height: 100%;
		background-color: var(--secondaryTheme);
	}
	p {
		font-family: UBold;
		color: var(--primaryThemeInverted);
		width: max-content;
	}
	.textBoxH {
		padding: var(--averageMargin) calc(var(--averageMargin) * 1.33);
		border-bottom: 1px solid var(--secondaryThemeInverted);
		width: 100%;
		background-color: var(--primaryTheme);
	}
	.peopleList {
		width: 100%;
		height: 100%;
		overflow: scroll;
	}
	.color {
		width: 100%;
		height: 2rem;
		/* margin-bottom: 1px; */
		border-bottom: 1px solid var(--secondaryThemeInverted);
	}
	.flex {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: start;
		background-color: var(--secondaryTheme);
		overflow: hidden;
	}
	.flexInfo {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.flex1 {
		width: 33.3%;
		height: 100%;
		border-right: 0.1px solid var(--secondaryThemeInverted);
	}
	.flex2 {
		width: 66.6%;
		height: 100%;
	}
	.infoBox {
		width: 100%;
		height: max-content;
		margin-right: -6px;
	}
	.infoData {
		height: 169px;
		width: calc(100%-1rem);
		background-color: var(--secondaryTheme);
		box-shadow: var(--boxShadows);
		border: 0.3px solid var(--secondaryThemeInverted);

		border-radius: var(--borderRadius);
		overflow: hidden;

		margin: var(--averageMargin);

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
