<script lang="ts">
	import { incrementLikes, likesabove10k, likeThatMsg } from '$lib/bigFunctions/likeThatMsg'
	import { pusher } from '$lib/bigFunctions/pusher'
	import { timeSince } from '$lib/bigFunctions/timeFormat'
	import { currentPage } from '$lib/stores/currentPage'
	import { isFlex } from '$lib/stores/isFlex'
	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { userName_id } from '$lib/stores/userName_id'
	import { userName } from '$lib/stores/userName'
	import { onDestroy, onMount } from 'svelte'
	import type { PageData } from './$types'
	import { messageId } from '$lib/stores/messageId'

	export let data: PageData
	const pageData = JSON.parse(data.body.data)

	onMount(() => {
		$isFlex = false
		$currentPage = 'REPLIES'
		$userGroup_id = pageData.group_id
		$messageId = pageData._id
		console.log('$serGroup_id', $userGroup_id)

		pusher.subscribe($messageId)
		pusher.subscribe($userGroup_id)
	})

	const like = () => {
		likeThatMsg({ _id: pageData._id, $userName_id, $userGroup_id, likes: pageData.likes })
	}

	const goTo = (_id: any) => {
		window.location.pathname = '/Messages/' + _id
	}

	onDestroy(() => {
		$messageId = ''
	})
</script>

<div class="body">
	<div class="replyMainMsg">
		<div class="flexBod paddingBottom">
			<p class="mainMessage" style={pageData.message.length > 33 ? '' : 'font-size: calc(var(--fontSize) * 1.6);'}><span class="sender">{pageData.sender}; </span> <span class="message">{pageData.message}</span></p>
			<span class="bottomButtons">
				<button on:click={like}><span id="LIKE?{pageData._id}" class="timeSpan LikeSpan">{pageData.likedPeople.includes($userName_id) ? "love'd" : 'love'}</span></button>
				<span class="timeSpan flexTime" style="margin-left: 10px;">{timeSince(pageData.createdAt)}</span>
				<button class="timeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span>{likesabove10k(pageData.totalReplies)} replies</span></p></button>
				<button class="timeSpan" style="margin-left: 10px;"><span class="optDark" id="LIKE_NO?{pageData._id}">{likesabove10k(pageData.likes)}</span><i class="fa-solid fa-heart optDark" style="margin:3px;" /></button>
			</span>
		</div>
	</div>
	<div class="allReplies">
		<div class="flexBod" id="replies">
			<div class="flexBodHeader">
				<p class="h1Text">REPLIES</p>
			</div>
			{#if pageData.replies.length === 0}
				<div class="flexBod flexReplyBod" id="removeBeforeSending">
					<p class="mainMessage">No replies yet</p>
				</div>
			{:else}
				{#each pageData.replies as reply}
					<div class="flexBod flexReplyBod paddingBottom">
						<p class="mainMessage">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat quo tenetur nesciunt at culpa voluptates voluptas est recusandae! Dignissimos nihil soluta mollitia quo repellat, illo magni perspiciatis aut nobis eveniet?</p>
						<span class="bottomButtons flexTime">
							<button on:click={like}><span id="LIKE?{reply._id}" class="timeSpan LikeSpan">{reply.likedPeople.includes($userName_id) ? "love'd" : 'love'}</span></button>
							<span class="timeSpan flexTime" style="margin-left: 10px;">{timeSince(reply.createdAt)}</span>
							<button class="timeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span>{likesabove10k(reply.totalReplies)} replies</span></p></button>
							<button class="timeSpan" style="margin-left: 10px;"><span class="optDark" id="LIKE_NO?{reply._id}">{likesabove10k(reply.likes)}</span><i class="fa-solid fa-heart optDark" style="margin:3px;" /></button>
							<button on:click={goTo.bind(globalThis, reply._id)} class="timeSpan LikeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span style="font-family:UBold; margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
						</span>
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<div class="bottomTextSpace" />
</div>

<style>
	.h1Text {
		font-family: UBold;
		color: var(--tertiaryThemeInverted);
		text-align: center;
		/* margin-bottom: 40px; */
	}
	.bottomTextSpace {
		height: 45px;
		width: 100%;
	}
	.body {
		height: 100%;
		width: 100%;

		overflow-y: scroll;
	}
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
	}
	.flexBod {
		background-color: var(--secondaryTheme);
		border-radius: calc(var(--borderRadius) / 1.3);
		border: 0.3px solid var(--secondaryThemeInverted);
		box-shadow: var(--boxShadows);

		margin: var(--averageMargin) calc(var(--averageMargin) * 3);
		padding: calc(var(--averageMargin) * 3);

		position: relative;
		overflow: hidden;

		/* background-image: linear-gradient(var(--secondaryTheme), var(--primaryTheme)); */
		/* background-image: linear-gradient(var(--primaryTheme), var(--secondaryTheme)); */
	}
	.paddingBottom {
		padding-bottom: calc(var(--averageMargin) * 9);
	}
	.flexReplyBod {
		background-color: var(--primaryTheme);

		background-image: none;
		box-shadow: var(--boxInsetShadows);
	}
	.startNewMsg {
		margin-bottom: calc(var(--averageMargin) * -3);
		text-align: center;
		font-family: UBold;
		margin-top: 20px;
		opacity: var(--dull);
	}
	.bottomButtons {
		position: absolute;
		width: 100%;
		bottom: calc(var(--averageMargin) * 3);
		left: calc(var(--averageMargin) * 3);

		display: flex;
	}
</style>
