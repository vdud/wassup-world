<script lang="ts">
	import { userName } from '$lib/stores/userName'
	import { user_message } from '$lib/stores/user_message'
	import { isFlex } from '$lib/stores/isFlex'
	import { fullDisplay } from '$lib/stores/fullDisplay'

	import { locationPrediction } from '$lib/stores/locationPrediction'
	import { nature } from '$lib/stores/nature'
	import { json } from '@sveltejs/kit'
	import { searchInput } from '$lib/stores/searchInput'
	import { searchData } from '$lib/stores/searchData'
	import { userName_id } from '$lib/stores/userName_id'
	import { publicReciever_Id } from '$lib/stores/publicReciever_Id'

	const toggleTranslation = async (loc: any) => {
		$fullDisplay = 'nonHidden'

		loc = loc
			.replace(/\s/g, '-')
			.replace(/[^a-zA-Z0-9-]/g, '')
			.toLowerCase()

		const res = await fetch('/api/locGroup_Id', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ loc, $userName_id }),
		})
		const response = await res.json()
		if (res.ok) {
			window.location.pathname = $userName_id + '/LOC/' + response.locGroup_Id
		} else if (!res.ok) {
			alert(response.message)
		}

		$isFlex = !$isFlex

		setTimeout(() => {
			$user_message = ''
			$fullDisplay = 'hidden'
		}, 600)
	}

	function hasSpace(searchInput: string) {
		return searchInput.indexOf('-') >= 0
	}
</script>

<div class="middleData">
	<div class="gradient" />
	<div class="paddedData">
		<div class="natureBox" style={$nature === 'PUBLIC' ? 'order:1' : 'order:2'}>
			<div class="natureLogo"><i class="fa fa-user faUser" /></div>

			{#if hasSpace($searchInput) === false && $searchInput.length < 19}
				<div class="natureDataBox">
					<div class="contact">
						<div class="flexContact">
							{#if $searchData.searchUserData.length > 0}
								{#each $searchData.searchUserData as user}
									<button
										on:click={() => {
											$fullDisplay = 'nonHidden'
											window.location.pathname = $userName_id + '/PUB/' + user._id
											$isFlex = !$isFlex
											setTimeout(() => {
												$user_message = ''
												$fullDisplay = 'hidden'
											}, 600)
										}}
										class="contactBox">
										<div class="i"><i class="fa fa-user-o LogoButton" /></div>
										<div class="cBoxText">
											<p class="cText" style="color: var(--secondary)">
												{user.name}
											</p>
										</div>
									</button>
								{/each}
							{:else}
								<div class="contactBox">
									<div class="i"><i class="fa fa-user-o LogoButton" /></div>
									<div class="cBoxText">
										<p class="cText" style="color: var(--secondary)">No User Found</p>
									</div>
								</div>
							{/if}
						</div>
					</div>
					{#if $searchInput.length > 2 && $searchInput.length < 19}
						<button
							class="sendMsgBox"
							on:click={async () => {
								$fullDisplay = 'nonHidden'
								const res = await fetch('/api/publicReciever_Id', {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify({ data: $searchInput }),
								})
								const response = await res.json()
								if (res.ok) {
									window.location.pathname = $userName_id + '/PUB/' + response.publicReciever_Id
								} else if (!res.ok) {
									alert(response.message)
								}
								$isFlex = !$isFlex
								setTimeout(() => {
									$user_message = ''
									$fullDisplay = 'hidden'
								}, 600)
							}}>
							<p class="hashMsg">
								<span class="fa fa-arrow-right fontBox arrow" />
								<span class="BOLD fontBox" style="color:var(--primaryThemeInverted)">Message </span>
								<span class="BOLD fontBox" style="color:var(--secondary)">;{$searchInput}</span>
							</p>
						</button>
					{/if}
				</div>
			{:else}
				<div class="natureDataBox">
					<button class="sendMsgBox">
						<p class="hashMsg">
							<span class="fa fa-arrow-right fontBox arrow" />
							<span class="BOLD fontBox" style="color:var(--primaryThemeInverted)">Message </span>
							<span class="BOLD fontBox" style="color:var(--secondary)">Noone's here 🤭</span>
						</p>
					</button>
				</div>
			{/if}
		</div>
		<div class="natureBox" style={$nature === 'HASHTAG' ? 'order:1' : 'order:2'}>
			<div class="natureLogo"><i class="fa fa-hashtag faHash" /></div>
			<div class="natureDataBox">
				<div class="contact">
					<div class="flexContact">
						{#if $searchData.searchGroupData.length > 0}
							{#each $searchData.searchGroupData as group}
								<button
									on:click={() => {
										$fullDisplay = 'nonHidden'
										window.location.pathname = '/HASH/' + group.name
										$isFlex = !$isFlex
										setTimeout(() => {
											$user_message = ''
											$fullDisplay = 'hidden'
										}, 600)
									}}
									class="contactBox">
									<div class="i"><i class="fa fa-hashtag LogoButton" /></div>
									<div class="cBoxText">
										<p class="cText" style="color: var(--primary)">
											{group.name}
										</p>
									</div>
								</button>
							{/each}
						{:else}
							<div class="contactBox">
								<div class="i"><i class="fa fa-hashtag LogoButton" /></div>
								<div class="cBoxText">
									<p class="cText" style="color: var(--primary)">No Group Found</p>
								</div>
							</div>
						{/if}
					</div>
				</div>
				<button
					class="sendMsgBox"
					on:click={async () => {
						$fullDisplay = 'nonHidden'
						const res = await fetch('/api/hashtagGroup_Id', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({ $searchInput, $userName_id }),
						})
						const response = await res.json()
						if (res.ok) {
							window.location.pathname = $userName_id + '/HASH/' + response.hashtagGroup_Id
						} else if (!res.ok) {
							alert(response.message)
						}
						$isFlex = !$isFlex
						setTimeout(() => {
							$user_message = ''
							$fullDisplay = 'hidden'
						}, 600)
					}}
					><p class="hashMsg">
						<span class="fa fa-arrow-right fontBox arrow" />
						<span class=" fontBox" style="color:var(--primaryThemeInverted)">Go To </span>
						<span class=" fontBox cText" style="color:var(--primary)"> #{$searchInput}</span>
					</p>
				</button>
			</div>
		</div>
		<div class="natureBox" style={$nature === 'LOCATION' ? 'order:1' : 'order:2'}>
			<div class="natureLogo"><i class="fa fa-location-pin faLoc" /></div>
			<div class="natureDataBox">
				<div class=" locationPredictions" id="locationPredictions">
					{#each $locationPrediction as loc}
						<button
							on:click={toggleTranslation.bind(
								globalThis,
								loc.description
									.replace(/\s/g, '-')
									.replace(/[^a-zA-Z0-9-]/g, '')
									.toLowerCase(),
							)}
							class="locBox"
							id={loc.description
								.replace(/\s/g, '-')
								.replace(/[^a-zA-Z0-9-]/g, '')
								.toLowerCase()}>
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
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
