<script lang="ts">
	import { likesabove10k, likeThatMsg } from '$lib/bigFunctions/likeThatMsg'
	import { timeSince } from '$lib/bigFunctions/timeFormat'
	import { currentPage } from '$lib/stores/currentPage'
	import { isFlex } from '$lib/stores/isFlex'
	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { userName_id } from '$lib/stores/userName_id'
	import { onMount } from 'svelte'
	import type { PageData } from './$types'

	export let data: PageData
	const pageData = JSON.parse(data.body.data)

	console.log('data', JSON.parse(data.body.data))

	const like = () => {
		likeThatMsg({ _id: pageData._id, $userName_id, $userGroup_id: pageData.group_id, likes: pageData.likes })
	}

	onMount(() => {
		$isFlex = false
		$currentPage = 'REPLIES'
		$userGroup_id = pageData._id
	})
</script>

<div class="replyMainMsg">
	<div class="flexBod">
		<p class="mainMessage" style={pageData.message.length > 33 ? '' : 'font-size: calc(var(--fontSize) * 1.6);'}><span class="sender">{pageData.sender}; </span> <span class="message">{pageData.message}</span></p>
		<span class="bottomButtons">
			<button class="timeSpan" style="margin-right: 10px;"><span class="optDark" id="LIKE_NO?{pageData._id}">{likesabove10k(pageData.likes)}</span><i class="fa-solid fa-heart optDark" style="margin:3px;" /></button>
			<span class="timeSpan" style="margin-right: 10px;">{timeSince(pageData.createdAt)}</span>
			<button on:click={like}><span id="LIKE?{pageData._id}" class="timeSpan LikeSpan">{pageData.likedPeople.includes($userName_id) ? "love'd" : 'love'} </span></button>
		</span>
	</div>
</div>

<style>
	.sender {
		color: var(--primary);
	}
	.mainMessage {
		font-family: imprima;
		color: var(--tertiaryThemeInverted);
		word-break: break-all;
	}
	.replyMainMsg {
		/* width: 100%; */
		height: auto;

		margin-top: 113px;

		padding: var(--averageMargin) calc(var(--averageMargin) * 3);
	}
	.flexBod {
		/* width: 100%;
		height: 100%; */
		background-color: var(--secondaryTheme);
		border-radius: calc(var(--borderRadius) / 1.3);
		padding: calc(var(--averageMargin) * 3);
		border: 0.3px solid var(--tertiaryThemeInverted);
		box-shadow: var(--boxShadows);
		padding-bottom: calc(var(--averageMargin) * 9);

		position: relative;
	}
	.bottomButtons {
		position: absolute;
		width: max-content;
		bottom: calc(var(--averageMargin) * 3);
		left: calc(var(--averageMargin) * 3);
	}
</style>
