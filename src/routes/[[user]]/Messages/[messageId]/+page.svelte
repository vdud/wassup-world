<script lang="ts">
	import { incrementLikes, incrementReplies, likesabove10k, likeThatMsg } from '$lib/bigFunctions/likeThatMsg';
	import { pusher } from '$lib/bigFunctions/pusher';
	import { currentPage } from '$lib/stores/currentPage';
	import { isFlex } from '$lib/stores/isFlex';
	import { userGroup_id } from '$lib/stores/userGroup_id';
	import { userName_id } from '$lib/stores/userName_id';
	import { userName } from '$lib/stores/userName';
	import { timeSince } from '$lib/bigFunctions/timeFormat';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';
	import { messageId } from '$lib/stores/messageId';
	import { currentPageHeaderData } from '$lib/stores/currentPageHeaderData';
	import { isShowInfo } from '$lib/stores/isShowInfo';
	import AboutGroup from '$lib/reusableComponents/AboutGroup.svelte';
	import { replyMessage } from '$lib/bigFunctions/applyTextMessage';

	export let data: PageData;
	const messageData = JSON.parse(data.body.message);

	const allUsers = JSON.parse(data.body.allUsers);
	const groupNature = JSON.parse(data.body.groupNature);

	const replyData = JSON.parse(data.body.replyData);
	const isReply = messageData.isReply;

	const goBack = () => {
		$isFlex = true;
		window.location.pathname = '/Messages/' + messageData.replyTo;
	};
	const goBackHome = () => {
		$isFlex = true;
		window.location.pathname = '/' + messageData.group_id;
	};

	const focusOnTextArea = () => {
		const textAreaId = document.getElementById('textAreaId');
		if (textAreaId) textAreaId.focus();
	};

	onMount(() => {
		$isFlex = false;
		$currentPage = 'REPLIES';
		$userGroup_id = messageData.group_id;
		$currentPageHeaderData = messageData.sender + '; ' + messageData.message.slice(0, 20) + '...';
		$messageId = messageData._id;

		pusher.subscribe($messageId).bind('ReplyMessage', (data: any) => {
			replyMessage({ data, $userGroup_id, $userName_id });
		});
		pusher
			.subscribe($userGroup_id)
			.bind('injectLike', (data: any) => {
				if (data.sender === $userName) {
					return;
				} else {
					incrementLikes({ _id: data.messageId, $userName_id, likes: data.likes });
				}
			})
			.bind('incrementReplies', (data: any) => {
				incrementReplies({ _id: data.messageId, replies: data.totalReplies });
			});
	});

	const like = (data: any) => {
		likeThatMsg({ _id: data._id, $userName_id, $userGroup_id, likes: data.likes });
	};

	const goTo = (_id: any) => {
		window.location.pathname = '/Messages/' + _id;
	};

	onDestroy(() => {
		$messageId = '';
	});
</script>

<svelte:head>
	<title>💬{messageData.sender}; {messageData.message.slice(0, 8)}...</title>
	<meta name="description" content="Hey check out this message from {messageData.sender} let me give you a gist: {messageData.message.slice(0, 3)}..." />
</svelte:head>

<div id="middleScroll" class="scroll">
	{#if isReply === true}
		<div class="goBackDiv">
			<button class="goBack" on:click={goBack}>
				<i class="fa fa-arrow-left pageMessage" />
				<p style="text-shadow:none;" class="pageMessage">GO BACK</p>
			</button>
		</div>
	{:else}
		<div class="goBackDiv">
			<button class="goBack" on:click={goBackHome}>
				<i class="fa fa-arrow-left pageMessage" />
				<p class="UBold pageMessage">GO BACK</p>
			</button>
		</div>
	{/if}

	<div class="replyMainMsg">
		<div class="flexBod paddingBottom">
			<p class="mainMessage" style={messageData.message.length > 33 ? '' : 'font-size: calc(var(--fontSize) * 1.6);'}><span class="sender">{messageData.sender}; </span> <span class="pageMessage">{messageData.message}</span></p>
			<span class="bottomButtons">
				<span class="timeSpan flexTime">{timeSince(messageData.createdAt)}</span>
				<button class="timeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span id="Replies_No?{messageData._id}">{likesabove10k(messageData.totalReplies.toString())} replies</span></p></button>
				<button on:click={like.bind(globalThis, { _id: messageData._id, likes: messageData.likes })} class="timeSpan replyLikeButton" style="margin-left: 10px;"><span class="optDark" id="LIKE_NO?{messageData._id}">{likesabove10k(messageData.likes)}</span><i id="FA_SOLID?{messageData._id}" class="{messageData.likedPeople.includes($userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
			</span>
		</div>
	</div>

	{#if groupNature !== 'PUBLIC'}
		<AboutGroup {allUsers} />
	{/if}
	<div class="allReplies">
		<div class="flexBod" id="replies">
			<div class="flexBodHeader">
				<p class="h1Text">REPLIES</p>
			</div>
			{#if messageData.replies.length === 0}
				<div class="flexBod flexReplyBod" id="removeBeforeSending">
					<button on:click={focusOnTextArea} class="noReplyButton">
						<p class="noMessage UBold pageMessage">send-a-message</p>
						<i class="fa fa-arrow-right noMessage" />
					</button>
				</div>
			{:else}
				{#each replyData as { _id, sender, message, createdAt, likes, likedPeople, totalReplies }}
					<div class="flexBod flexReplyBod paddingBottom">
						<p class="mainMessage"><span class="sender" style="color: var(--primary)">{sender}; </span><span style="color: var(--primaryThemeInverted)">{message}</span></p>
						<span class="bottomButtons">
							<span class="timeSpan flexTime">{timeSince(createdAt)}</span>
							<button class="timeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span id="Replies_No?{_id}">{likesabove10k(totalReplies)} replies</span></p></button>
							<button on:click={like.bind(globalThis, { _id: _id, likes: likes })} class="timeSpan replyLikeButton" style="margin-left: 10px;"><span class="optDark" id="LIKE_NO?{_id}">{likesabove10k(likes)}</span><i id="FA_SOLID?{_id}" class="{likedPeople.includes($userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
							<button on:click={goTo.bind(globalThis, _id)} class="timeSpan LikeSpan" style="margin-left: 10px;"><p class="totalRepliespText REPLY_TEXT"><span style="margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
						</span>
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<div class="bottomTextSpace" />
</div>

<style>
	.allReplies {
		padding-bottom: 1rem;
	}
	.scroll {
		height: 100%;
		overflow: auto;
	}
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
		color: var(--primaryThemeInverted);
		margin-right: var(--averageMargin);

		transition: all 0.2s ease-in-out;
	}
	.noMessage:hover,
	.noMessage:active {
		background-color: var(--tertiaryThemeInverted);
		color: var(--primaryTheme);
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
