<script lang="ts">
	import { debounce } from '$lib/bigFunctions/debounce';
	import { timeSince } from '$lib/bigFunctions/timeFormat';
	import { incrementLikes, incrementReplies, likesabove10k, likeThatMsg } from '$lib/bigFunctions/likeThatMsg';

	import { userName } from '$lib/stores/userName';
	import { userName_id } from '$lib/stores/userName_id';
	import { userGroup_id } from '$lib/stores/userGroup_id';
	import { isFlex } from '$lib/stores/isFlex';
	import AboutGroup from './AboutGroup.svelte';
	import GroupAd from './GroupAd.svelte';
	import { fade } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	import { currentPage } from '$lib/stores/currentPage';
	import { currentPageHeaderData } from '$lib/stores/currentPageHeaderData';
	import { invader } from '$lib/stores/invader';
	import { pusher } from '$lib/bigFunctions/pusher';
	import { alreadyApplied, applyMessage, applyNavDataMessage } from '$lib/bigFunctions/applyTextMessage';
	import { isTypingData } from '$lib/stores/isTypingData';

	const like = ({ _id, likes }: any) => {
		likeThatMsg({ _id, $userName_id, likes, $userGroup_id });
	};

	const goTo = (_id: any) => {
		$isFlex = true;
		window.location.pathname = '/Messages/' + _id;
	};

	export let data: any;
	// onMount(() => {
	// });
	const allUsers = JSON.parse(data.body.allUsers);

	const scrolltoBottom = () => {
		const middleScroll: any = document.getElementById('middleScroll');
		middleScroll.scrollTop = middleScroll.scrollHeight;
	};

	let aboveSwitch = false;
	const parseScroll = () => {
		const middleScroll: any = document.getElementById('middleScroll');
		if (middleScroll.scrollTop < -69) {
			aboveSwitch = true;
		} else if (middleScroll.scrollTop > -69) {
			aboveSwitch = false;
		}
	};
	const debouncedScroll = debounce(parseScroll, 30);

	onMount(() => {
		$isFlex = false;
		$currentPage = data.body.nature;
		$userGroup_id = JSON.parse(data.groupId);
		$currentPageHeaderData = data.body.groupName;

		const debouncedInvader = debounce(() => {
			$invader = false;
		}, 1000);

		pusher
			.subscribe($userGroup_id)
			.bind('injectMessage', (data: any) => {
				console.log('data', data);
				if (data.sender !== $userName) {
					const isYoMe = false;
					applyMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, messageId: data.messageId, $userName_id, $userGroup_id, isYoMe });
					applyNavDataMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: 'LOCATIONS' });
					return;
				} else {
					const isYoMe = true;

					const checkIfInvader = () => {
						if (!$invader) {
							applyMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, messageId: data.messageId, $userName_id, $userGroup_id, isYoMe });
							alreadyApplied(data);
						}
					};
					const debouncedCheck = debounce(checkIfInvader, 100);

					// checkIfInvader();
					debouncedCheck();

					debouncedInvader();
					return;
				}
			})
			.bind('injectLike', (data: any) => {
				if (data.sender === $userName) {
					return;
				} else {
					incrementLikes({ _id: data.messageId, $userName_id, likes: data.likes });
				}
			})
			.bind('incrementReplies', (data: any) => {
				incrementReplies({ _id: data.messageId, replies: data.totalReplies });
			})
			.bind('pingTyping', (data: any) => {
				if (data.pinging === $userName) {
					return;
				} else {
					$isTypingData.message = data.pinging + ' is typing...';
					$isTypingData.isTyping = true;
					setTimeout(() => {
						$isTypingData.message = '';
						$isTypingData.isTyping = false;
					}, 3000);
				}
			});
	});

	onDestroy(() => {
		$currentPage = '';
	});
</script>

{#if aboveSwitch === true}
	<div class="scrollToBottom" in:fade out:fade>
		<button class="scrollButton" on:click={scrolltoBottom}><i class="fa fa-arrow-down" /></button>
	</div>
{/if}

<div class="hashContainer" id="middleScroll" on:scroll={debouncedScroll}>
	<div class="gradient" />
	<div class="gradientBtm" />
	<!-- <div class="hashContainer" id="middleScroll" on:scroll={parseScroll}> -->
	<div class="margins margin-bottom" />
	<div id="textMessages" class="textMessages" />
	<GroupAd />
	<div class="hashMessagesContainer">
		{#each JSON.parse(data.body.messages) as { sender, message, createdAt, _id, likedPeople, likes, totalReplies }}
			{#if sender !== $userName}
				<div class="text sendermain">
					<p class="pText textShadows">
						<span class="replySender" style="color:var(--primary)">{sender}; </span>
						<span class="pageMessage">{message}</span>
					</p>
					<span class="spanFlexLeft">
						<span class="timeSpan flexTime">{timeSince(createdAt)}</span>
						<button class="timeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span id="Replies_No?{_id}">{likesabove10k(totalReplies)} replies</span></p></button>
						<button on:click={like.bind(globalThis, { _id: _id, likes: likes })} class="timeSpan replyLikeButton" style="margin-left: 10px;"><span class="optDark" id="LIKE_NO?{_id}">{likesabove10k(likes)}</span><i id="FA_SOLID?{_id}" class="{likedPeople.includes($userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
						<button on:click={goTo.bind(globalThis, _id)} class="timeSpan LikeSpan" style="margin-left: 10px;"><p class="totalRepliespText REPLY_TEXT"><span style=" margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
					</span>
				</div>
			{:else if sender === $userName}
				<div class="text yoMe">
					<p class="pText textShadows">
						<span class="replySender" style="color:var(--secondary)">{sender}; </span>
						<span class="pageMessage">{message}</span>
					</p>
					<span class="spanFlexRight">
						<button on:click={goTo.bind(globalThis, _id)} class="timeSpan LikeSpan" style="margin-right: 10px;"><p class="totalRepliespText REPLY_TEXT"><span style=" margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
						<button on:click={like.bind(globalThis, { _id: _id, likes: likes })} class="timeSpan replyLikeButton" style="margin-right: 10px;"><span class="optDark" id="LIKE_NO?{_id}">{likesabove10k(likes)}</span><i id="FA_SOLID?{_id}" class="{likedPeople.includes($userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
						<button class="timeSpan" style="margin-right: 10px;"><p class="totalRepliespText"><span id="Replies_No?{_id}">{likesabove10k(totalReplies)} replies</span></p></button>
						<span class="timeSpan flexTime">{timeSince(createdAt)}</span>
					</span>
				</div>
			{/if}
		{/each}

		<AboutGroup {allUsers} />

		{#if JSON.parse(data.body.topLikes).length > 0}
			<div>
				<h1 class="topLikesHeader">
					<span class="topLikesHeaderSpan">TOP-LIKES</span>
				</h1>
			</div>
			<div class="hashMessagesContainer">
				{#each JSON.parse(data.body.topLikes) as { sender, message, createdAt, _id, likedPeople, likes, totalReplies }}
					{#if sender !== $userName}
						<div class="text sender">
							<p class="pText textShadows">
								<span class="replySender" style="color:var(--primary)">{sender}; </span>
								<span class="pageMessage">{message}</span>
								<span class="spanFlexLeft">
									<span class="timeSpan flexTime">{timeSince(createdAt)}</span>
									<button class="timeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span id="Replies_No?{_id}">{likesabove10k(totalReplies)} replies</span></p></button>
									<button on:click={like.bind(globalThis, { _id: _id, likes: likes })} class="timeSpan replyLikeButton" style="margin-left: 10px;"><span class="optDark" id="TopLike_No?{_id}">{likesabove10k(likes)}</span><i id="FA_SOLID_TOP?{_id}" class="{likedPeople.includes($userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
									<button on:click={goTo.bind(globalThis, _id)} class="timeSpan LikeSpan" style="margin-left: 10px;"><p class="totalRepliespText REPLY_TEXT"><span style=" margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
								</span>
							</p>
						</div>
					{:else if sender === $userName}
						<div class="text yoMe">
							<p class="pText textShadows">
								<span class="senderReply" style="color:var(--secondary)">{sender}; </span>
								<span class="pageMessage">{message}</span>
								<span class="spanFlexRight">
									<button on:click={goTo.bind(globalThis, _id)} class="timeSpan LikeSpan" style="margin-right: 10px;"><p class="totalRepliespText REPLY_TEXT"><span style=" margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
									<button on:click={like.bind(globalThis, { _id: _id, likes: likes })} class="timeSpan replyLikeButton" style="margin-right: 10px;"><span class="optDark" id="TopLike_No?{_id}">{likesabove10k(likes)}</span><i id="FA_SOLID_TOP?{_id}" class="{likedPeople.includes($userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
									<button class="timeSpan" style="margin-right: 10px;"><p class="totalRepliespText"><span id="Replies_No?{_id}">{likesabove10k(totalReplies)} replies</span></p></button>
									<span class="timeSpan flexTime">{timeSince(createdAt)}</span>
								</span>
							</p>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
	<div class="margins margin-top" />
</div>

<style>
	.gradientBtm {
		width: 100%;
		height: 60px;
		background: linear-gradient(0deg, var(--red) 60%, #0000 100%);
		/* background-color: var(--red); */
		position: absolute;
		z-index: 2;
		bottom: 0;
		right: 0;

		pointer-events: none;
	}
</style>
