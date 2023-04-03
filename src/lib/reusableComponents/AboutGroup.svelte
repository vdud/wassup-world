<script lang="ts">
	import { copyLink, shareViaEmail, shareViaMessageApp, shareViaWhatsApp } from '$lib/bigFunctions/socialsGroupAbt';
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
						<div class="colored copyLink">
							<button on:click={copyLink} class="faBtn">
								<i class="faIcon fa-solid fa-link" />
							</button>
						</div>
						<div class="colored email">
							<button on:click={shareViaEmail} class="faBtn">
								<i class="faIcon fa-solid fa-envelope envoFa" />
							</button>
						</div>
						<div class="colored whatsapp">
							<button on:click={shareViaWhatsApp} class="faBtn">
								<i class="faIcon fa-brands fa-whatsapp" />
							</button>
						</div>
						<div class="colored messageApp">
							<button on:click={shareViaMessageApp} class="faBtn">
								<i class="faIcon fa-solid fa-comment-alt" />
							</button>
						</div>
					</div>
				</div>
				<div class="flex 👽">
					<div class="textBoxH"><p>Members 👽</p></div>
					<div class="peopleList">
						<div class="membersColumn memberHeader">
							<div class="flexItem flexItem1"><div class="flexLeft"><p class="headerText">Name</p></div></div>
							<div class="flexItem flexItem2"><div class="flexLeft"><p class="headerText">Last seen</p></div></div>
							<div class="flexItem flexItem3">
								<button class="flexCenter"
									><p class="headerText">Chat</p>
									<i class="fa-solid fa-envelope msgDis" /></button>
							</div>
						</div>
						{#each allUsers as user}
							<div class="membersColumn">
								<div class="flexItem flexItem1"><div class="flexLeft"><p class="headerText memberName">;{user.name}</p></div></div>
								<div class="flexItem flexItem2"><div class="flexLeft"><p class="headerText">{timeSince(user.lastLoggedIn)}</p></div></div>
								<div class="flexItem flexItem3 sendMsgBtn">
									<button
										class="flexCenter"
										on:click={() => {
											window.location.pathname = `${$userName_id}/PUB/${user._id}`;
										}}
										><p class="pTextMember sendAmsg">SEND</p>
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
	.faBtn {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.faIcon {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		scale: 2.33;
		text-shadow: var(--textShadows);
		color: black;
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
	}
	.fa-link {
		/* background-image: linear-gradient(33deg, var(--primaryThemeInverted), var(--tertiaryThemeInverted)); */
		background-image: linear-gradient(33deg, var(--primaryThemeInverted) 33%, var(--secOptDark) 55%);
	}
	.envoFa {
		background-image: linear-gradient(33deg, var(--primaryThemeInverted) 33%, var(--red) 55%);
	}
	.fa-whatsapp {
		background-image: linear-gradient(33deg, var(--primaryThemeInverted) 33%, var(--green) 55%);
	}
	.fa-comment-alt {
		background-image: linear-gradient(33deg, var(--primaryThemeInverted) 33%, var(--blue) 55%);
	}
	.msgDis {
		color: var(--secondaryThemeInverted);
		margin-left: var(--lessAverageMargin);
		opacity: var(--extraDull);
		font-size: 0.7rem;
	}
	.sendAmsg {
		color: var(--primaryThemeInverted);
		text-shadow: var(--textShadows);
		width: max-content;
		border-radius: 5px;
		margin-right: var(--lessAverageMargin);

		/* scale: 0.9; */
	}
	.flexLeft {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: start;
		margin-left: var(--averageMargin);
	}
	.flexCenter {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.pTextMember,
	.headerText {
		width: max-content;
		/* width: 1000px; */
		display: flex;
		align-items: center;
		justify-content: start;
	}
	.headerText {
		font-family: UBold;
		color: var(--secondaryThemeInverted);
		opacity: var(--extraDull);
		font-size: 0.7rem;
	}
	.memberName {
		color: var(--secondary);
		opacity: 1;
	}
	.shareLogosContainer {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		background-color: var(--primaryTheme);
	}
	.colored {
		overflow: hidden;
		width: 100%;
		height: 100%;
	}
	.colored:hover {
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
		overflow-y: scroll;
		margin-bottom: -1px;
		/* margin-bottom: -10px; */
	}
	.sendMsgBtn {
		background-color: var(--primaryTheme);
	}
	.membersColumn {
		width: 100%;
		height: 2rem;
		/* margin-bottom: 1px; */

		border-bottom: 1px solid var(--secondaryThemeInverted);
		display: flex;
		justify-content: start;
		align-items: center;
	}
	.memberHeader {
		border-top: 1px solid var(--secondaryThemeInverted);
		margin-top: -1px;
	}
	.flexItem {
		height: 100%;
		/* margin-right: 1px; */
		border-right: 0.1px solid var(--secondaryThemeInverted);
		overflow: hidden;
	}
	.flexItem1 {
		width: 45%;
	}
	.flexItem2 {
		width: 25%;
	}
	.flexItem3 {
		width: 30%;
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
		width: 100%;
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
		border: 1px solid var(--secondaryThemeInverted);

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
