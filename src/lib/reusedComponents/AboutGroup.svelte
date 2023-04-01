<script lang="ts">
	import { timeSince } from '$lib/bigFunctions/timeFormat';
	import { currentPage } from '$lib/stores/currentPage';
	import { isShowInfo } from '$lib/stores/isShowInfo';
	import { userName_id } from '$lib/stores/userName_id';

	export let allUsers: any;
</script>

{#if $currentPage !== 'PUBLIC'}
	<div class="infoBox" style={$isShowInfo ? 'scale: 1; opacity:1;' : 'scale: 0; padding:.2rem;margin-top:-2rem;margin-bottom:-11rem; opacity:0;'}>
		<div class="infoData">
			<div class="flexInfo">
				<div class="flex 🔗">
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
				<div class="flex 👽">
					<div class="textBoxH"><p>Members 👽</p></div>
					<div class="peopleList">
						<div class="memberOne">
							<div class="flexItem flexItem1"><div class="flexLeft"><p class="headerText">Name</p></div></div>
							<div class="flexItem flexItem2"><div class="flexLeft"><p class="headerText">Last seen</p></div></div>
							<div class="flexItem flexItem3"><button class="flexLeft"><p class="headerText">Chat</p></button></div>
						</div>
						{#each allUsers as user}
							<div class="memberOne">
								<div class="flexItem flexItem1"><div class="flexLeft"><p class="pTextMember memberName">@{user.name}</p></div></div>
								<div class="flexItem flexItem2"><div class="flexLeft"><p class="pTextMember">{timeSince(user.lastLoggedIn)}</p></div></div>
								<div class="flexItem flexItem3">
									<button
										class="flexLeft"
										on:click={() => {
											window.location.pathname = `${$userName_id}/PUB/${user._id}`;
										}}
										><p class="pTextMember sendAmsg">SEND-A-MESSAGE</p>
										<i class="fa-solid fa-envelope sendAmsg" /></button>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.memberName {
		color: var(--secondary);
	}
	.sendAmsg {
		color: var(--secOptLight);
		width: max-content;
		border-radius: 5px;
		margin: 3px var(--lessAverageMargin);

		/* scale: 0.9; */
	}
	.flexLeft {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: start;
		margin-left: 10px;
	}
	.pTextMember,
	.headerText {
		width: max-content;
	}
	.headerText {
		font-family: UBold;
		color: var(--secondaryThemeInverted);
		opacity: var(--extraDull);
	}
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
		margin-bottom: -10px;
	}
	.memberOne {
		width: 100%;
		height: 2rem;
		/* margin-bottom: 1px; */
		border-bottom: 1px solid var(--secondaryThemeInverted);

		display: flex;
		justify-content: start;
		align-items: center;
	}
	.flexItem {
		height: 100%;
		margin-right: 1px;
		border-right: 0.1px solid var(--secondaryThemeInverted);
	}
	.flexItem1 {
		width: 45%;
	}
	.flexItem2 {
		width: 20%;
	}
	.flexItem3 {
		width: 35%;
		border-right: none;
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

	.🔗 {
		width: 33.3%;
		height: 100%;
		border-right: 0.1px solid var(--secondaryThemeInverted);
	}
	.👽 {
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
	::-webkit-scrollbar {
		width: 0px;
	}
</style>
