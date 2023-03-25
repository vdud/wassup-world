<script lang="ts">
	import { incrementLikes, incrementReplies, likesabove10k, likeThatMsg } from '$lib/bigFunctions/likeThatMsg'
	import { pusher } from '$lib/bigFunctions/pusher'
	import { currentPage } from '$lib/stores/currentPage'
	import { isFlex } from '$lib/stores/isFlex'
	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { userName_id } from '$lib/stores/userName_id'
	import { userName } from '$lib/stores/userName'
	import { timeSince } from '$lib/bigFunctions/timeFormat'
	import { onDestroy, onMount } from 'svelte'
	import type { PageData } from './$types'
	import { messageId } from '$lib/stores/messageId'
	import { currentPageHeaderData } from '$lib/stores/currentPageHeaderData'
	import { isShowInfo } from '$lib/stores/isShowInfo'

	export let data: PageData
	const messageData = JSON.parse(data.body.message)

	const replyData = JSON.parse(data.body.replyData)
	const isReply = messageData.isReply

	const goBack = () => {
		window.location.pathname = '/Messages/' + messageData.replyTo
	}
	const goBackHome = () => {
		window.location.pathname = '/' + messageData.group_id
	}

	const focusOnTextArea = () => {
		const textAreaId = document.getElementById('textAreaId')
		if (textAreaId) textAreaId.focus()
	}

	onMount(() => {
		$isFlex = false
		$currentPage = 'REPLIES'
		$userGroup_id = messageData.group_id
		$currentPageHeaderData = messageData.sender + '; ' + messageData.message.slice(0, 20) + '...'
		$messageId = messageData._id

		pusher.subscribe($messageId).bind('ReplyMessage', (data: any) => {
			const replies = document.getElementById('replies')
			const removeBeforeSending = document.getElementById('removeBeforeSending')

			if (removeBeforeSending) {
				removeBeforeSending.remove()
			}
			if (replies) {
				const div = document.createElement('div')
				div.classList.add('flexBod', 'flexReplyBod', 'paddingBottom')

				const p = document.createElement('p')
				p.classList.add('mainMessage')
				const span = document.createElement('span')
				span.classList.add('sender')
				span.style.color = 'var(--primary)'
				span.innerText = data.sender + '; '
				const span2 = document.createElement('span')
				span2.style.color = 'var(--tertiaryThemeInverted)'
				span2.innerText = data.message

				p.appendChild(span)
				p.appendChild(span2)

				const bottomButtons = document.createElement('span')
				bottomButtons.classList.add('bottomButtons')

				const timeSpan = document.createElement('span')
				timeSpan.classList.add('timeSpan', 'flexTime')
				timeSpan.innerText = timeSince(data.createdAt)

				const totalRepliesButton = document.createElement('button')
				totalRepliesButton.classList.add('timeSpan')
				totalRepliesButton.style.marginLeft = '10px'
				const totalRepliespText = document.createElement('p')
				totalRepliespText.classList.add('totalRepliespText')
				const totalRepliesSpan = document.createElement('span')
				totalRepliesSpan.id = 'Replies_No?' + data._id
				totalRepliesSpan.innerText = likesabove10k(data.totalReplies) + ' replies'

				totalRepliespText.appendChild(totalRepliesSpan)
				totalRepliesButton.appendChild(totalRepliespText)

				const likeButton = document.createElement('button')
				likeButton.classList.add('timeSpan', 'replyLikeButton')
				likeButton.style.marginLeft = '10px'
				likeButton.onclick = () => {
					like({ _id: data._id, likes: data.likes })
				}
				const optDark = document.createElement('span')
				optDark.classList.add('optDark')
				optDark.id = 'LIKE_NO?' + data._id
				optDark.innerText = '0'
				const FA_SOLIDi = document.createElement('i')
				FA_SOLIDi.classList.add('fa-regular', 'fa-heart', 'optDark')
				FA_SOLIDi.style.margin = '3px'
				FA_SOLIDi.id = 'FA_SOLID?' + data._id

				likeButton.appendChild(optDark)
				likeButton.appendChild(FA_SOLIDi)

				const goToButton = document.createElement('button')
				goToButton.classList.add('timeSpan', 'LikeSpan')
				goToButton.style.marginLeft = '10px'
				goToButton.onclick = () => {
					window.location.pathname = '/Messages/' + data._id
				}
				const goToText = document.createElement('p')
				goToText.classList.add('totalRepliespText', 'REPLY_TEXT')
				const REPLYSPAN = document.createElement('span')
				REPLYSPAN.innerText = 'REPLY'
				REPLYSPAN.style.marginRight = '5px'
				const FA_SQ_U_R = document.createElement('i')
				FA_SQ_U_R.classList.add('fa', 'fa-square-up-right')

				goToText.appendChild(REPLYSPAN)
				goToText.appendChild(FA_SQ_U_R)

				goToButton.appendChild(goToText)

				bottomButtons.appendChild(timeSpan)
				bottomButtons.appendChild(totalRepliesButton)
				bottomButtons.appendChild(likeButton)
				bottomButtons.appendChild(goToButton)

				//append all

				div.appendChild(p)
				div.appendChild(bottomButtons)
				replies.appendChild(div)
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

<div id="middleScroll">
	{#if isReply === true}
		<!-- go back to previous message -->
		<div class="goBackDiv">
			<button class="goBack" on:click={goBack}>
				<i class="fa fa-arrow-left" />
				<p style="text-shadow:none;">GO BACK</p>
			</button>
		</div>
	{:else}
		<div class="goBackDiv">
			<button class="goBack" on:click={goBackHome}>
				<i class="fa fa-arrow-left" />
				<p class="UBold">GO BACK</p>
			</button>
		</div>
	{/if}

	<div class="replyMainMsg">
		<div class="flexBod paddingBottom">
			<p class="mainMessage" style={messageData.message.length > 33 ? '' : 'font-size: calc(var(--fontSize) * 1.6);'}><span class="sender">{messageData.sender}; </span> <span class="message">{messageData.message}</span></p>
			<span class="bottomButtons">
				<span class="timeSpan flexTime">{timeSince(messageData.createdAt)}</span>
				<button class="timeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span id="Replies_No?{messageData._id}">{likesabove10k(messageData.totalReplies)} replies</span></p></button>
				<button on:click={like.bind(globalThis, { _id: messageData._id, likes: messageData.likes })} class="timeSpan replyLikeButton" style="margin-left: 10px;"><span class="optDark" id="LIKE_NO?{messageData._id}">{likesabove10k(messageData.likes)}</span><i id="FA_SOLID?{messageData._id}" class="{messageData.likedPeople.includes($userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
			</span>
		</div>
	</div>
	<div class="infoBox" style={$isShowInfo ? 'scale: 1; opacity:1;' : 'scale: 0; padding:.2rem;margin-top:-2rem;margin-bottom:-6rem; opacity:0;'}><div class="infoData"><h1 class="comingSoon">Working on the mechanics to make it the best social-app ever designed/engineered.</h1></div></div>

	<div class="allReplies">
		<div class="flexBod" id="replies">
			<div class="flexBodHeader">
				<p class="h1Text">REPLIES</p>
			</div>
			{#if messageData.replies.length === 0}
				<div class="flexBod flexReplyBod" id="removeBeforeSending">
					<button on:click={focusOnTextArea} class="noReplyButton">
						<p class="noMessage UBold">send-a-message</p>
						<i class="fa fa-arrow-right noMessage" />
					</button>
				</div>
			{:else}
				{#each replyData as reply}
					<div class="flexBod flexReplyBod paddingBottom">
						<p class="mainMessage"><span class="sender" style="color: var(--primary)">{reply.sender}; </span><span style="color: var(--tertiaryThemeInverted)">{reply.message}</span></p>
						<span class="bottomButtons">
							<span class="timeSpan flexTime">{timeSince(reply.createdAt)}</span>
							<button class="timeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span id="Replies_No?{reply._id}">{likesabove10k(reply.totalReplies)} replies</span></p></button>
							<button on:click={like.bind(globalThis, { _id: reply._id, likes: reply.likes })} class="timeSpan replyLikeButton" style="margin-left: 10px;"><span class="optDark" id="LIKE_NO?{reply._id}">{likesabove10k(reply.likes)}</span><i id="FA_SOLID?{reply._id}" class="{reply.likedPeople.includes($userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
							<button on:click={goTo.bind(globalThis, reply._id)} class="timeSpan LikeSpan" style="margin-left: 10px;"><p class="totalRepliespText REPLY_TEXT"><span style="margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
						</span>
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<div class="bottomTextSpace" />
</div>

<style>
	.UBold {
		font-family: UBold;
		text-shadow: none;
	}
	.noMessage {
		width: max-content;
		background-color: var(--tertiaryTheme);
		box-shadow: var(--boxShadows);
		padding: 0.5rem 1rem;
		border-radius: var(--borderRadius);
		color: var(--tertiaryThemeInverted);
		margin-right: var(--averageMargin);

		transition: all 0.2s ease-in-out;
	}
	.noMessage:hover,
	.noMessage:active {
		background-color: var(--tertiaryThemeInverted);
		color: var(--tertiaryTheme);
		box-shadow: var(--boxShadowsBlur);
	}
	.noReplyButton {
		width: 100%;
		display: flex;
		justify-content: start;
		align-items: center;
		cursor: inherit;
	}
	.goBackDiv {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: left;
		align-items: center;

		margin-left: calc(var(--averageMargin) * 1.3);

		margin-top: 113px;
	}
	.goBack {
		color: var(--tertiaryThemeInverted);
		display: flex;

		background-color: var(--tertiaryTheme);
		box-shadow: var(--boxShadows);
		border-radius: var(--borderRadius);
		padding: 0.4rem 1rem;
	}
	.goBack:hover,
	.goBack:focus,
	.goBack:active {
		box-shadow: var(--boxInsetShadows);
	}
	.fa-arrow-left {
		padding-right: 5px;
	}
</style>
