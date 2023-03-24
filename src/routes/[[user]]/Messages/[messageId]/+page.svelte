<script lang="ts">
	import { incrementLikes, incrementReplies, likesabove10k, likeThatMsg } from '$lib/bigFunctions/likeThatMsg'
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
	import { currentPageHeaderData } from '$lib/stores/currentPageHeaderData'

	export let data: PageData

	const messageData = JSON.parse(data.body.data)
	const replyData = JSON.parse(data.body.replyData)

	console.log('messageData', messageData)
	console.log('replyData', replyData)

	onMount(() => {
		$isFlex = false
		$currentPage = 'REPLIES'
		$userGroup_id = messageData.group_id
		$messageId = messageData._id

		console.log('$userGroup_id', $userGroup_id)

		pusher.subscribe($messageId).bind('ReplyMessage', (data: any) => {
			const replies = document.getElementById('replies')
			const removeBeforeSending = document.getElementById('removeBeforeSending')

			if (!replies) return console.log('error occured, please refresh the page')
			if (removeBeforeSending) {
				removeBeforeSending.remove()
			}
		})
		pusher
			.subscribe($userGroup_id)
			.bind('injectLike', (data: any) => {
				if (data.sender === $userName) {
					return
				} else {
					incrementLikes({ _id: data.messageId, $userName_id, likes: data.likes })
					// incrementTopLikes({ _id: data.messageId, $userName_id, likes: data.likes })
				}
			})
			.bind('incrementReplies', (data: any) => {
				incrementReplies({ _id: data.messageId, replies: data.totalReplies })
			})
	})

	const like = (data: any) => {
		likeThatMsg({ _id: data._id, $userName_id, $userGroup_id, likes: data.likes })
	}

	const goTo = (_id: any) => {
		window.location.pathname = '/Messages/' + _id
	}

	onDestroy(() => {
		$messageId = ''
	})
</script>

<div id="replyBody">
	<div class="replyMainMsg">
		<div class="flexBod paddingBottom">
			<p class="mainMessage" style={messageData.message.length > 33 ? '' : 'font-size: calc(var(--fontSize) * 1.6);'}><span class="sender">{messageData.sender}; </span> <span class="message">{messageData.message}</span></p>
			<span class="bottomButtons">
				<button on:click={like.bind(globalThis, { _id: messageData._id, likes: messageData.likes })}><span id="LIKE?{messageData._id}" class="timeSpan LikeSpan">{messageData.likedPeople.includes($userName_id) ? "love'd" : 'love'}</span></button>
				<span class="timeSpan flexTime" style="margin-left: 10px;">{timeSince(messageData.createdAt)}</span>
				<button class="timeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span id="Replies_No?{messageData._id}">{likesabove10k(messageData.totalReplies)} replies</span></p></button>
				<button class="timeSpan" style="margin-left: 10px;"><span class="optDark" id="LIKE_NO?{messageData._id}">{likesabove10k(messageData.likes)}</span><i class="fa-solid fa-heart optDark" style="margin:3px;" /></button>
			</span>
		</div>
	</div>
	<div class="allReplies">
		<div class="flexBod" id="replies">
			<div class="flexBodHeader">
				<p class="h1Text">REPLIES</p>
			</div>
			{#if messageData.replies.length === 0}
				<div class="flexBod flexReplyBod" id="removeBeforeSending">
					<p class="mainMessage">No replies yet</p>
				</div>
			{:else}
				{#each replyData as reply}
					<div class="flexBod flexReplyBod paddingBottom">
						<p class="mainMessage"><span class="sender" style="color: var(--primary)">{reply.sender}; </span><span class="message">{reply.message}</span></p>
						<span class="bottomButtons">
							<button on:click={like.bind(globalThis, { _id: reply._id, likes: reply.likes })}><span id="LIKE?{reply._id}" class="timeSpan LikeSpan">{reply.likedPeople.includes($userName_id) ? "love'd" : 'love'}</span></button>
							<span class="timeSpan flexTime" style="margin-left: 10px;">{timeSince(reply.createdAt)}</span>
							<button class="timeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span id="Replies_No?{reply._id}">{likesabove10k(reply.totalReplies)} replies</span></p></button>
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
	#replyBody {
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
		border-radius: 6px;
		border: 0.3px solid var(--secondaryThemeInverted);
		box-shadow: var(--boxShadows);

		margin: var(--averageMargin) calc(var(--averageMargin) * 1.3);
		padding: calc(var(--averageMargin) * 1.3);

		position: relative;
		overflow: hidden;

		/* background-image: linear-gradient(var(--secondaryTheme), var(--primaryTheme)); */
		/* background-image: linear-gradient(var(--primaryTheme), var(--secondaryTheme)); */
	}
	.paddingBottom {
		padding-bottom: calc(var(--averageMargin) * 5);
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
		bottom: calc(var(--averageMargin) * 1.3);
		left: calc(var(--averageMargin) * 1.3);

		display: flex;
	}
</style>
