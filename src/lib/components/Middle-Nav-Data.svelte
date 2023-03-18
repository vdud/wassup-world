<script lang="ts">
	import { locationPrediction } from '$lib/stores/locationPrediction'
	import { loginResponseData } from '$lib/stores/loginResponseData'
	import { nature } from '$lib/stores/nature'
	import { json } from '@sveltejs/kit'
	import { timeSince } from '$lib/timeFormat'
	import { applyNavDataMessage } from '$lib/applyTextMessage'
	import { onMount } from 'svelte'

	// console.log($loginResponseData)

	const toggleLoc = (groupName: any) => {
		window.location.pathname = '/LOC/' + groupName
		$nature = 'LOCATIONS'
	}
	const toggleHashtag = (groupName: any) => {
		window.location.pathname = '/HASH/' + groupName
		$nature = 'HASHTAGS'
	}
	const togglePublic = (groupName: any) => {
		window.location.pathname = '/PUB/' + groupName
		$nature = 'PUBLIC'
	}
</script>

<div class="middleData">
	<div class="gradient" />
	<div class="paddedData">
		<!-- <div class="natureBox " style="order:5">
			<div class="natureLogo"><i class="fa fa-ad faAd" /></div>
			<div class="natureDataBox">
				<div class="contact">
					<div class="flexContact">
						<div class="contactBox">
							<div class="i"><i class="fa fa-user-o  LogoButton" style="opacity:var(--dull)" /></div>
							<div class="cBoxText"><p class="cText" style="color: var(--secondaryThemeInverted);opacity:var(--dull)">HarryPotter</p></div>
						</div>
					</div>
				</div>
				<button class="sendMsgBox">
					<p class="hashMsg">
						<span class="fa fa-arrow-right  fontBox arrow" />
						<span class="BOLD fontBox " style="color:var(--secondaryThemeInverted)">Message </span>
						<span class="BOLD fontBox" style="color:var(--secondaryThemeInverted)">;harry</span>
					</p>
				</button>
			</div>
		</div> -->

		<div class="natureBox " style={$nature === 'LOCATION' ? 'order:1' : 'order:2'}>
			<div class="natureLogo"><i class="fa fa-location-pin faLoc" /></div>
			<div class="natureDataBox">
				<div class=" locationPredictions" id="locationPredictions">
					{#if $loginResponseData.success === false || $loginResponseData.data.formatedLOCdata === undefined || $loginResponseData.data.formatedLOCdata.length === 0}
						<div class="noMoreBox" />
						<div class="noMoreText"><i class="fa-solid fa-hand-middle-finger noText" /></div>
					{:else if $loginResponseData.success === true}
						{#each $loginResponseData.data.formatedLOCdata as { _id, name, lastMessage, updatedAt, latestMessageSender }, i}
							<button on:click={toggleLoc.bind(globalThis, name)} id={_id} class="locBox">
								<div class="locBoxItems item1" style="padding-top:5px;margin-bottom:-5px;">
									<p class="textLoc text2" style="color:var(--secOptDark)">{name}</p>
								</div>
								{#if lastMessage === undefined}
									<div class="locBoxItems item2"><p class="textLoc text1" style="font-size:var(--fontSize)"><span class="sendBox" style={$nature === 'LOCATION' ? 'background-color:var(--secOptDark)' : 'background-color:var(--tertiaryThemeInverted )'}>SEND MESSAGE</span><span style={$nature === 'LOCATION' ? 'background-color:var(--secOptDark)' : 'background-color:var(--tertiaryThemeInverted )'} class="fa fa-arrow-right sendArrow" /></p></div>
								{:else}
									<div class="locBoxItems item2"><p class="textLoc text1" style="font-size:var(--fontSize)"><span style="color:var(--secOptLight); padding-right:6px" class="latestMessage">{latestMessageSender};</span><span class="latestMessage"> {lastMessage}</span></p></div>
								{/if}

								<div class="locBoxItems item3">
									<p class="textLoc text3">{timeSince(updatedAt)}</p>
								</div>
							</button>
						{/each}
					{/if}
				</div>
			</div>
		</div>
		<div class="natureBox " style={$nature === 'HASHTAG' ? 'order:1' : 'order:3'}>
			<div class="natureLogo"><i class="fa fa-hashtag faHash" /></div>
			<div class="natureDataBox">
				<div class=" locationPredictions" id="locationPredictions">
					{#if $loginResponseData.success === false || $loginResponseData.data.formatedHASHTAGSdata === undefined || $loginResponseData.data.formatedHASHTAGSdata.length === 0}
						<div class="noMoreBox" />
						<div class="noMoreText">
							<i class="fa-solid fa-hand-middle-finger noText" />
						</div>
					{:else if $loginResponseData.success === true}
						{#each $loginResponseData.data.formatedHASHTAGSdata as group}
							<button on:click={toggleHashtag.bind(globalThis, group.name)} id={group._id} class="locBox">
								<div class="locBoxItems item1" style="padding-top:5px;margin-bottom:-5px;">
									<p class="textLoc text2" style="color:var(--primary)">#{group.name}</p>
								</div>
								{#if group.lastMessage === undefined}
									<div class="locBoxItems item2"><p class="textLoc text1" style="font-size:var(--fontSize)"><span class="sendBox" style={$nature === 'HASHTAG' ? 'background-color:var(--primary)' : 'background-color:var(--tertiaryThemeInverted )'}>SEND MESSAGE</span><span style={$nature === 'HASHTAG' ? 'background-color:var(--primary)' : 'background-color:var(--tertiaryThemeInverted )'} class="fa fa-arrow-right sendArrow" /></p></div>
								{:else}
									<div class="locBoxItems item2"><p class="textLoc text1" style="font-size:var(--fontSize)"><span style="color:var(--secOptLight); padding-right:6px" class="latestMessage">{group.latestMessageSender};</span><span class="latestMessage"> {group.lastMessage}</span></p></div>
								{/if}

								<div class="locBoxItems item3">
									<p class="textLoc text3">{timeSince(group.updatedAt)}</p>
								</div>
							</button>
						{/each}
					{/if}
				</div>
			</div>
		</div>
		<div class="natureBox " style={$nature === 'PUBLIC' ? 'order:1' : 'order:4'}>
			<div class="natureLogo"><i class="fa fa-user-o faUser" /></div>
			<div class="natureDataBox">
				<div class=" locationPredictions" id="locationPredictions">
					{#if $loginResponseData.success === false || $loginResponseData.data.formatedPUBLICdata === undefined || $loginResponseData.data.formatedPUBLICdata.length === 0}
						<div class="noMoreBox" />
						<div class="noMoreText"><i class="fa-solid fa-hand-middle-finger noText" /></div>
					{:else if $loginResponseData.success === true}
						{#each $loginResponseData.data.formatedPUBLICdata as group}
							<button on:click={togglePublic.bind(globalThis, group.name)} id={group._id} class="locBox">
								<div class="locBoxItems item1" style="padding-top:5px;margin-bottom:-5px;">
									<p class="textLoc text2" style="color:var(--secondary)">{group.name}</p>
								</div>
								{#if group.lastMessage === undefined}
									<div class="locBoxItems item2"><p class="textLoc text1" style="font-size:var(--fontSize); "><span class="sendBox" style={$nature === 'PUBLIC' ? 'background-color:var(--secondary)' : 'background-color:var(--tertiaryThemeInverted )'}>SEND MESSAGE</span><span style={$nature === 'PUBLIC' ? 'background-color:var(--secondary)' : 'background-color:var(--tertiaryThemeInverted )'} class="fa fa-arrow-right sendArrow" /></p></div>
								{:else}
									<div class="locBoxItems item2"><p class="textLoc text1" style="font-size:var(--fontSize)"><span style="color:var(--secOptLight); padding-right:6px" class="latestMessage">{group.latestMessageSender};</span><span class="latestMessage"> {group.lastMessage}</span></p></div>
								{/if}

								<div class="locBoxItems item3">
									<p class="textLoc text3">{timeSince(group.updatedAt)}</p>
								</div>
							</button>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.sendBox {
		font-size: calc(var(--fontSize) / 1.2);
		font-family: UBold;
		width: max-content;
		padding: calc(var(--averageMargin) / 4) calc(var(--averageMargin) / 1.2);
		border-radius: calc(var(--borderRadius) / 3);
		color: var(--primaryTheme);
		box-shadow: var(--boxShadows);
		margin: calc(var(--averageMargin) * -0.5);
		scale: 0.9;
		transition: all 200ms ease-in-out;
	}
	.sendArrow {
		color: var(--primaryTheme);
		font-size: calc(var(--fontSize) / 1.2);
		margin-left: calc(var(--averageMargin) / 2);
		box-shadow: var(--boxShadows);
		padding: calc(var(--averageMargin) / 4) calc(var(--averageMargin) / 1.2);
		border-radius: calc(var(--borderRadius) / 3);
		transition: all 200ms ease-in-out;
	}
	.sendArrow:hover,
	.sendBox:hover {
		color: var(--secondaryThemeInverted);
		text-shadow: var(--boxShadows);
	}
	.noMoreBox {
		height: calc(var(--averageMargin) * 2);
		width: 100%;
	}
	.noMoreText {
		height: calc(var(--averageMargin) * 3);
	}
	.noText {
		font-size: calc(var(--fontSize) * 0.9);
		/* font-family: Imprima; */
		width: max-content;
		/* padding: calc(var(--averageMargin) / 4) calc(var(--averageMargin) / 1.2); */
		color: var(--secondaryThemeInverted);
		/* background-color: var(--primaryThemeInverted); */
		margin: var(--averageMargin);
		scale: 0.9;
		opacity: var(--extraDull);
	}
	.fa-hand-middle-finger {
		color: var(--primaryThemeInverted);
	}
	.locationPredictions {
		border-bottom: 0.5px solid var(--tertiaryThemeInverted);
	}
</style>
