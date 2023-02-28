<script lang="ts">
	import { locationPrediction } from '$lib/stores/locationPrediction'
	import { nature } from '$lib/stores/nature'
	import { json } from '@sveltejs/kit'

	// $: console.log($locationPrediction)
</script>

<div class="middleData">
	<div class="gradient" />
	<div class="paddedData">
		<div class="natureBox " style={$nature === 'PUBLIC' ? 'order:1' : 'order:2'}>
			<div class="natureLogo"><i class="fa fa-user faUser" /></div>
			<div class="natureDataBox">
				<div class="contact">
					<div class="flexContact">
						<div class="contactBox">
							<div class="i"><i class="fa fa-user-o  LogoButton" /></div>
							<div class="cBoxText"><p class="cText" style="color: var(--secondary)">HarryPotter</p></div>
						</div>
					</div>
				</div>
				<button class="sendMsgBox">
					<p class="hashMsg">
						<span class="fa fa-arrow-right  fontBox arrow" />
						<span class="BOLD fontBox " style="color:var(--secondaryThemeInverted)">Message </span>
						<span class="BOLD fontBox" style="color:var(--secondary)">;harry</span>
					</p>
				</button>
			</div>
		</div>
		<div class="natureBox " style={$nature === 'HASHTAG' ? 'order:1' : 'order:2'}>
			<div class="natureLogo"><i class="fa fa-hashtag faHash" /></div>
			<div class="natureDataBox">
				<div class="contact">
					<div class="flexContact">
						<div class="contactBox">
							<div class="i"><i class="fa fa-hashtag  LogoButton" /></div>
							<div class="cBoxText"><p class="cText" style="color: var(--primary)">HarryPotter</p></div>
						</div>
					</div>
				</div>
				<button class="sendMsgBox"
					><p class="hashMsg">
						<span class="fa fa-arrow-right  fontBox arrow" />
						<span class=" fontBox " style="color:var(--secondaryThemeInverted)">Go To </span>
						<span class=" fontBox cText" style="color:var(--primary)"> #harry-potter</span>
					</p>
				</button>
			</div>
		</div>
		<div class="natureBox " style={$nature === 'LOCATION' ? 'order:1' : 'order:2'}>
			<div class="natureLogo"><i class="fa fa-location-pin faLoc" /></div>
			<div class="natureDataBox">
				<div class=" locationPredictions" id="locationPredictions">
					{#each $locationPrediction as loc}
						<a
							href="/{loc.description
								.replace(/\s/g, '-')
								.replace(/[^a-zA-Z0-9-]/g, '')
								.toLowerCase()}"
							class="locBox"
							id={loc.description
								.replace(/\s/g, '-')
								.replace(/[^a-zA-Z0-9-]/g, '')
								.toLowerCase()}
						>
							<div class="locBoxItems item1"><p class="textLoc text1">{loc.structured_formatting.main_text}</p></div>

							{#if loc.structured_formatting.secondary_text != undefined}
								<div class="locBoxItems item2">
									<p class="textLoc text2">{loc.structured_formatting.secondary_text.toUpperCase()}</p>
								</div>
							{:else}
								<div class="locBoxItems item2">
									<p class="textLoc text2" style="font-family:UBold">OFFICIAL</p>
								</div>
							{/if}

							<div class="locBoxItems item3">
								{#each loc.types as aboutLoc, i}
									{#if i >= 0}
										<p class="textLoc text3">{aboutLoc.replace(/_/g, ' ').toUpperCase()}</p>
									{:else if i === 0}
										<p class="textLoc text3" style="margin-left: 0;">no tags available...</p>
									{/if}
								{/each}
							</div>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
