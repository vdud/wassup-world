<script lang="ts">
	import { locationPrediction } from '$lib/stores/locationPrediction';
	import { loginResponseData } from '$lib/stores/loginResponseData';
	import { nature } from '$lib/stores/nature';
	import { json } from '@sveltejs/kit';
	import { timeSince } from '$lib/timeFormat';
</script>

<div class="middleData">
	<div class="gradient" />
	<div class="paddedData">
		<div class="natureBox " style="order:5">
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
		</div>

		<div class="natureBox " style={$nature === 'LOCATION' ? 'order:1' : 'order:2'}>
			<div class="natureLogo"><i class="fa fa-location-pin faLoc" /></div>
			<div class="natureDataBox">
				<div class=" locationPredictions" id="locationPredictions">
					{#each $loginResponseData as loginData}
						{#if loginData.group.nature === 'LOCATIONS'}
							{#if loginData.group.message != null}
								{#each loginData.group.message as message}
									<a href="/LOC/{message.name}" class="locBox" id={loginData.group.id}>
										<div class="locBoxItems item1" style="padding-top:5px;margin-bottom:-5px;">
											<p class="textLoc text2">{message.groupName}</p>
										</div>
										<div class="locBoxItems item2"><p class="textLoc text1" style="font-size:var(--fontSize)"><span style="color:var(--secondary);padding-right:calc(var(--averageMargin)/3)">{message.userName}; </span><span style="color:var(--primary);opacity:var(--dull)">{message.text}</span></p></div>

										<div class="locBoxItems item3">
											<p class="textLoc text3">{@html timeSince(message.createdAt)}</p>
										</div>
									</a>
								{/each}
							{/if}
						{/if}
					{/each}
				</div>
				<div class="noMoreBox" />
				<div class="noMoreText"><p class="noText">NO CHATS TO SHOW...</p></div>
			</div>
		</div>
		<div class="natureBox " style={$nature === 'HASHTAG' ? 'order:1' : 'order:3'}>
			<div class="natureLogo"><i class="fa fa-hashtag faHash" /></div>
			<div class="natureDataBox">
				<div class=" locationPredictions" id="locationPredictions">
					{#each $loginResponseData as loginData}
						{#if loginData.group.nature === 'HASHTAGS'}
							{#each loginData.group.message as message}
								<a href="/LOC/{message.name}" class="locBox" id={loginData.group.id}>
									<div class="locBoxItems item1" style="padding-top:5px;margin-bottom:-5px;">
										<p class="textLoc text2">{message.groupName}</p>
									</div>
									<div class="locBoxItems item2"><p class="textLoc text1" style="font-size:var(--fontSize)"><span style="color:var(--secondary);padding-right:calc(var(--averageMargin)/3)">{message.userName}; </span><span style="color:var(--primary);opacity:var(--dull)">{message.text}</span></p></div>

									<div class="locBoxItems item3">
										<p class="textLoc text3">{@html timeSince(message.createdAt)}</p>
									</div>
								</a>
							{/each}
						{/if}
					{/each}
				</div>
				<div class="noMoreBox" />
				<div class="noMoreText"><p class="noText">NO CHATS TO SHOW...</p></div>
			</div>
		</div>
		<div class="natureBox " style={$nature === 'PUBLIC' ? 'order:1' : 'order:4'}>
			<div class="natureLogo"><i class="fa fa-user-o faUser" /></div>
			<div class="natureDataBox">
				<div class=" locationPredictions" id="locationPredictions">
					{#each $loginResponseData as loginData}
						{#if loginData.group.nature === 'PUBLIC'}
							{#each loginData.group.message as message}
								<a href="/LOC/{message.name}" class="locBox" id={loginData.group.id}>
									<div class="locBoxItems item1" style="padding-top:5px;margin-bottom:-5px;">
										<p class="textLoc text2">{message.groupName}</p>
									</div>
									<div class="locBoxItems item2"><p class="textLoc text1" style="font-size:var(--fontSize)"><span style="color:var(--secondary);padding-right:calc(var(--averageMargin)/3)">{message.userName}; </span><span style="color:var(--primary);opacity:var(--dull)">{message.text}</span></p></div>

									<div class="locBoxItems item3">
										<p class="textLoc text3">{@html timeSince(message.createdAt)}</p>
									</div>
								</a>
							{/each}
						{/if}
					{/each}
				</div>
				<div class="noMoreBox" />
				<div class="noMoreText"><p class="noText">NO CHATS TO SHOW...</p></div>
			</div>
		</div>
	</div>
</div>

<style>
	.noMoreBox {
		height: calc(var(--averageMargin) * 2);
		width: 100%;
	}
	.noMoreText {
		height: calc(var(--averageMargin) * 3);
	}
	.noText {
		font-size: calc(var(--fontSize) / 1.2);
		font-family: UBold;
		width: max-content;
		padding: calc(var(--averageMargin) / 4) calc(var(--averageMargin) / 1.2);
		border-radius: calc(var(--borderRadius) / 3);
		color: var(--primaryTheme);
		background-color: var(--primaryThemeInverted);
		margin: var(--averageMargin);
		scale: 0.9;
		opacity: var(--extraDull);
	}
	.locationPredictions {
		border-bottom: 0.5px solid var(--tertiaryThemeInverted);
	}
</style>
