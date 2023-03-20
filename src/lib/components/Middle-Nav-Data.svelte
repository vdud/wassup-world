<script lang="ts">
	import { locationPrediction } from '$lib/stores/locationPrediction'
	import { loginResponseData } from '$lib/stores/loginResponseData'
	import { nature } from '$lib/stores/nature'
	import { json } from '@sveltejs/kit'
	import { timeSince } from '$lib/bigFunctions/timeFormat'
	import { applyNavDataMessage } from '$lib/bigFunctions/applyTextMessage'
	import { onMount } from 'svelte'
	import { toggleLoc, toggleHashtag, togglePublic } from '$lib/bigFunctions/toggleNavLocs'

	// console.log($loginResponseData)

	// const toggleLoc = (groupName: any) => {
	// 	localStorage.setItem('nature', JSON.stringify({ $nature: 'LOCATION' }))
	// 	window.location.pathname = '/LOC/' + groupName
	// }
	// const toggleHashtag = (groupName: any) => {
	// 	localStorage.setItem('nature', JSON.stringify({ $nature: 'HASHTAG' }))
	// 	window.location.pathname = '/HASH/' + groupName
	// }
	// const togglePublic = (groupName: any) => {
	// 	localStorage.setItem('nature', JSON.stringify({ $nature: 'PUBLIC' }))
	// 	window.location.pathname = '/PUB/' + groupName
	// }
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
				<div class=" locationPredictions">
					{#if $loginResponseData.success === false || $loginResponseData.data.formatedLOCdata === undefined || $loginResponseData.data.formatedLOCdata.length === 0}
						<div class="noMoreBox" />
						<div class="noMoreText"><i class="fa-solid fa-hand-middle-finger noText" /></div>
					{:else if $loginResponseData.success === true}
						{#each $loginResponseData.data.formatedLOCdata as { _id, name, lastMessage, updatedAt, latestMessageSender }, i}
							<!-- CONTACT BUTTON - START-->
							<button on:click={toggleLoc.bind(globalThis, name)} id="locBox?{_id}" class="locBox {i === 0 ? 'locBoxLocationNotification' : ''}">
								<!-- SENDER -->
								<div class="locBoxItems item1" style="padding-top:5px;margin-bottom:-5px;">
									<p class="textLoc text2" style={i === 0 ? 'color: var(--secOptDark)' : ''} id="gName?{_id}">{name.toUpperCase()}</p>
								</div>

								<!-- LATEST MESSAGE -->
								<div class="locBoxItems item2">
									<p class="textLoc text1" style="font-size:var(--fontSize)">
										{#if lastMessage === undefined}
											<span id="SENDER?{_id}" style={i === 0 ? 'color: var(--secOptDark)' : ''} class="latestMessageSender"><span class="sendBox" style="background-color:var(--secOptDark)"> SEND MESSAGE </span></span>
											<span id="LM?{_id}" class="latestMessage"><span style="background-color:var(--secOptDark)" class="fa fa-arrow-right sendArrow" /></span>
										{:else}
											<span id="SENDER?{_id}" style={i === 0 ? 'color: var(--secOptDark)' : ''} class="latestMessageSender">
												{latestMessageSender};
											</span>
											<span id="LM?{_id}" class="latestMessage">
												{lastMessage}
											</span>
										{/if}
									</p>
								</div>

								<!-- TIME -->
								<div class="locBoxItems item3">
									<p id="LMT?{_id}" class="textLoc text3">{timeSince(updatedAt)}</p>
								</div>
							</button>
							<!-- CONTACT BUTTON - END -->
						{/each}
					{/if}
				</div>
			</div>
		</div>
		<div class="natureBox " style={$nature === 'HASHTAG' ? 'order:1' : 'order:3'}>
			<div class="natureLogo"><i class="fa fa-hashtag faHash" /></div>
			<div class="natureDataBox">
				<div class="locationPredictions">
					{#if $loginResponseData.success === false || $loginResponseData.data.formatedHASHTAGSdata === undefined || $loginResponseData.data.formatedHASHTAGSdata.length === 0}
						<div class="noMoreBox" />
						<div class="noMoreText">
							<i class="fa-solid fa-hand-middle-finger noText" />
						</div>
					{:else if $loginResponseData.success === true}
						{#each $loginResponseData.data.formatedHASHTAGSdata as group, i}
							<button on:click={toggleHashtag.bind(globalThis, group.name)} id="locBox?{group._id}" class="locBox {i === 0 ? 'locBoxHashNotification' : ''}">
								<div class="locBoxItems item1" style="padding-top:5px;margin-bottom:-5px;">
									<p class="textLoc text2" style={i === 0 ? 'color: var(--primary)' : ''} id="gName?{group._id}">#{group.name.toUpperCase()}</p>
								</div>
								<div class="locBoxItems item2">
									<p class="textLoc text1" style="font-size:var(--fontSize)">
										{#if group.lastMessage === undefined}
											<span id="SENDER?{group._id}" style={i === 0 ? 'color: var(--primary)' : ''} class="latestMessageSender"><span class="sendBox" style="background-color:var(--primary)"> SEND MESSAGE </span></span>
											<span id="LM?{group._id}" class="latestMessage"><span style="background-color:var(--primary)" class="fa fa-arrow-right sendArrow" /></span>
										{:else}
											<span id="SENDER?{group._id}" style={i === 0 ? 'color: var(--primary)' : ''} class="latestMessageSender">
												{group.latestMessageSender};
											</span>
											<span id="LM?{group._id}" class="latestMessage">
												{group.lastMessage}
											</span>
										{/if}
									</p>
								</div>

								<div class="locBoxItems item3">
									<p id="LMT?{group._id}" class="textLoc text3">{timeSince(group.updatedAt)}</p>
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
				<div class=" locationPredictions">
					{#if $loginResponseData.success === false || $loginResponseData.data.formatedPUBLICdata === undefined || $loginResponseData.data.formatedPUBLICdata.length === 0}
						<div class="noMoreBox" />
						<div class="noMoreText"><i class="fa-solid fa-hand-middle-finger noText" /></div>
					{:else if $loginResponseData.success === true}
						<div id="PUB" />
						{#each $loginResponseData.data.formatedPUBLICdata as group, i}
							<button on:click={togglePublic.bind(globalThis, group.name)} id="locBox?{group._id}" class="locBox {i === 0 ? 'locBoxPubNotification' : ''}">
								<div class="locBoxItems item1" style="padding-top:5px;margin-bottom:-5px;">
									<p class="textLoc text2" style={i === 0 ? 'color: var(--secondary)' : ''} id="gName?{group._id}">{group.name.toUpperCase()}</p>
								</div>
								<div class="locBoxItems item2">
									<p class="textLoc text1" style="font-size:var(--fontSize); ">
										{#if group.lastMessage === undefined}
											<span id="SENDER?{group._id}" style={i === 0 ? 'color: var(--secondary)' : ''} class="latestMessageSender"><span class="sendBox" style="background-color:var(--secondary)"> SEND MESSAGE </span></span>
											<span id="LM?{group._id}" class="latestMessage"><span class="fa fa-arrow-right sendArrow" style="background-color:var(--secondary)" /></span>
										{:else}
											<span id="SENDER?{group._id}" style={i === 0 ? 'color: var(--secondary)' : ''} class="latestMessageSender">
												{group.latestMessageSender};
											</span>
											<span id="LM?{group._id}" class="latestMessage">
												{group.lastMessage}
											</span>
										{/if}
									</p>
								</div>

								<div class="locBoxItems item3">
									<p id="LMT?{group._id}" class="textLoc text3">{timeSince(group.updatedAt)}</p>
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
		/* margin: calc(var(--averageMargin) * -0.5); */
		/* margin-left: calc(var(--averageMargin) * 0.5); */
		/* scale: 20; */

		transition: all 200ms ease-in-out;
		text-shadow: none;

		/* background-size: 2; */
		/* margin-left: 1px; */
	}
	.sendArrow {
		color: var(--primaryTheme);
		font-size: calc(var(--fontSize) / 1.2);
		margin-left: calc(var(--averageMargin) / 2);
		box-shadow: var(--boxShadows);
		padding: calc(var(--averageMargin) / 4) calc(var(--averageMargin) / 1.2);
		border-radius: calc(var(--borderRadius) / 3);
		transition: all 200ms ease-in-out;
		text-shadow: none;
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
