<script lang="ts">
	import { loginResponseData } from '$lib/stores/loginResponseData';
	import { nature } from '$lib/stores/nature';
	import { timeSince } from '$lib/bigFunctions/timeFormat';
	import { toggleLoc, toggleHashtag, togglePublic } from '$lib/bigFunctions/toggleNavLocs';
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

		<div class="natureBox" style={$nature === 'LOCATION' ? 'order:1' : 'order:2'}>
			<div class="natureLogo"><i class="fa fa-location-pin faLoc" /></div>
			<div class="natureDataBox">
				<div class=" locationPredictions">
					{#if $loginResponseData.success === false || $loginResponseData.data.formatedLOCdata === undefined || $loginResponseData.data.formatedLOCdata.length === 0}
						<div class="noMoreBox" />
						<div class="noMoreText"><i class="fa-solid fa-hand-middle-finger noText" /></div>
					{:else if $loginResponseData.success === true}
						{#each $loginResponseData.data.formatedLOCdata as { _id, name, lastMessage, updatedAt, latestMessageSender, Theme }, i}
							<!-- CONTACT BUTTON - START-->
							{#if i < 9}
								<!-- <div class="absThemeImg"></div> -->
								<a href="/LOC/{name}" on:click={toggleLoc.bind(globalThis, name, _id)} id="locBox?{_id}" class="locBox {i === 0 ? 'locBoxLocationNotification' : ''}">
									<!-- SENDER -->
									<div class="locBoxItems item1" style="padding-top:5px;margin-bottom:-5px;">
										<p class="textLoc text2" style={i === 0 ? 'color: var(--secOptDark);' : ''} id="gName?{_id}">{name.toUpperCase()}</p>
									</div>

									<!-- LATEST MESSAGE -->
									<div class="locBoxItems item2">
										<p class="textLoc text1" style="font-size:var(--fontSize)">
											{#if lastMessage === undefined}
												<span id="SENDER?{_id}" class="latestMessageSender"><span class="sendAll sendBox" style="background-color:var(--secOptDark)"> SEND MESSAGE </span></span>
												<span id="LM?{_id}" class="latestMessage"><span style="background-color:var(--secOptDark)" class="fa fa-arrow-right sendAll sendArrow" /></span>
											{:else}
												<span id="SENDER?{_id}" class="latestMessageSender">
													{latestMessageSender};
												</span>
												<span id="LM?{_id}" class="latestMessage pageMessage">
													{lastMessage}
												</span>
											{/if}
										</p>
									</div>

									<!-- TIME -->
									<div class="locBoxItems item3">
										<p id="LMT?{_id}" class="textLoc text3">{timeSince(updatedAt)}</p>
									</div>

									{#if Theme}
										<div class="locBoxItems itemTheme" style="z-index: 0;">
											<div class="gradientTheme" />
											<img src={Theme} alt={Theme} class="ThemeImg" />
										</div>
									{/if}
								</a>

								<!-- CONTACT BUTTON - END -->
							{/if}
						{/each}
					{/if}
				</div>
			</div>
		</div>
		<div class="natureBox" style={$nature === 'HASHTAG' ? 'order:1' : 'order:3'}>
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
							{#if i < 9}
								<a href="/HASH/{group.name}" on:click={toggleHashtag.bind(globalThis, group.name, group._id)} id="locBox?{group._id}" class="locBox {i === 0 ? 'locBoxHashNotification' : ''}">
									<div class="locBoxItems item1" style="padding-top:5px;margin-bottom:-5px;">
										<p class="textLoc text2" style={i === 0 ? 'color: var(--primary) ;' : ''} id="gName?{group._id}">#{group.name.toUpperCase()}</p>
									</div>
									<div class="locBoxItems item2">
										<p class="textLoc text1" style="font-size:var(--fontSize)">
											{#if group.lastMessage === undefined}
												<span id="SENDER?{group._id}" class="latestMessageSender"><span class="sendAll sendBox" style="background-color:var(--primary)"> SEND MESSAGE </span></span>
												<span id="LM?{group._id}" class="latestMessage"><span style="background-color:var(--primary)" class="fa fa-arrow-right sendAll sendArrow" /></span>
											{:else}
												<span id="SENDER?{group._id}" class="latestMessageSender">
													{group.latestMessageSender};
												</span>
												<span id="LM?{group._id}" class="latestMessage pageMessage">
													{group.lastMessage}
												</span>
											{/if}
										</p>
									</div>

									<div class="locBoxItems item3">
										<p id="LMT?{group._id}" class="textLoc text3">{timeSince(group.updatedAt)}</p>
									</div>
								</a>
							{/if}
						{/each}
					{/if}
				</div>
			</div>
		</div>
		<div class="natureBox" style={$nature === 'PUBLIC' ? 'order:1' : 'order:4'}>
			<div class="natureLogo"><i class="fa fa-user-o faUser" /></div>
			<div class="natureDataBox">
				<div class=" locationPredictions">
					<div id="PUB" />
					{#if $loginResponseData.success === false || $loginResponseData.data.formatedPUBLICdata === undefined || $loginResponseData.data.formatedPUBLICdata.length === 0}
						<div class="noMoreBox" id="noMoreBox" />
						<div class="noMoreText" id="noMoreText"><i class="fa-solid fa-hand-middle-finger noText" /></div>
					{:else if $loginResponseData.success === true}
						{#each $loginResponseData.data.formatedPUBLICdata as group, i}
							{#if i < 9}
								<a href="/PUB/{group.name}" on:click={togglePublic.bind(globalThis, group.name, group._id)} id="locBox?{group._id}" class="locBox {i === 0 ? 'locBoxPubNotification' : ''}">
									<div class="locBoxItems item1" style="padding-top:5px;margin-bottom:-5px;">
										<p class="textLoc text2" style={i === 0 ? 'color: var(--secondary);' : ''} id="gName?{group._id}">{group.name.toUpperCase()}</p>
									</div>
									<div class="locBoxItems item2">
										<p class="textLoc text1" style="font-size:var(--fontSize); ">
											{#if group.lastMessage === undefined}
												<span id="SENDER?{group._id}" class="latestMessageSender"><span class="sendAll sendBox" style="background-color:var(--secondary)"> SEND MESSAGE </span></span>
												<span id="LM?{group._id}" class="latestMessage"><span class="fa fa-arrow-right sendAll sendArrow" style="background-color:var(--secondary)" /></span>
											{:else}
												<span id="SENDER?{group._id}" class="latestMessageSender">
													{group.latestMessageSender};
												</span>
												<span id="LM?{group._id}" class="latestMessage pageMessage">
													{group.lastMessage}
												</span>
											{/if}
										</p>
									</div>

									<div class="locBoxItems item3">
										<p id="LMT?{group._id}" class="textLoc text3">{timeSince(group.updatedAt)}</p>
									</div>
								</a>
							{/if}
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.gradientTheme {
		background: linear-gradient(90deg, #0000, var(--secondaryTheme));
		position: absolute;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
	}
	.itemTheme {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		height: 100%;
		width: auto;
		padding-left: 0;
	}
	.ThemeImg {
		/* position: absolute; */
		/* top: 0; */
		/* left: 0; */
		/* z-index: ; */
		/* width: 100%; */
		height: 100%;
		opacity: 0.75;
		/* object-fit: cover; */
	}
	.sendBox {
		font-family: UBold;
	}
	.sendAll {
		font-size: calc(var(--fontSize) / 1.2);
		width: max-content;
		padding: calc(var(--averageMargin) / 4) calc(var(--averageMargin) / 1.2);
		border-radius: calc(var(--borderRadius) / 3);
		box-shadow: var(--boxShadows);

		transition: all 200ms ease-in-out;
		text-shadow: none;
		color: var(--secondaryTheme);
	}
	.sendArrow {
		margin-left: var(--lessAverageMargin);
		/* padding-bottom: 4px; */
	}
	.sendArrow:hover,
	.sendAll:hover {
		color: var(--primaryThemeInverted);
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
		width: max-content;
		margin: var(--averageMargin);
		scale: 0.9;
		opacity: var(--dull);
	}
	.fa-hand-middle-finger {
		color: var(--tertiaryThemeInverted);
	}
	.locationPredictions {
		border-bottom: 0.5px solid var(--tertiaryThemeInverted);
	}
	.natureLogo {
		background-color: var(--primaryTheme);
	}
</style>
