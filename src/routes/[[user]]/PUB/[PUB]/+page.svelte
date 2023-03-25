<script lang="ts">
	import { userName } from '$lib/stores/userName'
	import { currentPageHeaderData } from '$lib/stores/currentPageHeaderData'
	import { currentPage } from '$lib/stores/currentPage'
	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { onDestroy, onMount } from 'svelte'
	import { pusher } from '$lib/bigFunctions/pusher'
	import type { PageData } from './$types'
	import { isFlex } from '$lib/stores/isFlex'
	import { timeSince } from '$lib/bigFunctions/timeFormat'
	import { isShowInfo } from '$lib/stores/isShowInfo'
	import { currentGroupCreatedAt } from '$lib/stores/currentGroupCreatedAt'
	import { debounce } from '$lib/bigFunctions/debounce'
	import { applyMessage, applyNavDataMessage } from '$lib/bigFunctions/applyTextMessage'
	import { userName_id } from '$lib/stores/userName_id'
	import { likeThatMsg, likesabove10k, incrementLikes, incrementReplies } from '$lib/bigFunctions/likeThatMsg'

	export let data: PageData

	onMount(() => {
		$isFlex = false
		$currentPageHeaderData = data.body.groupName
		$currentGroupCreatedAt = data.body.createdAt

		$currentPage = 'PUBLIC'
		$userGroup_id = JSON.parse(data.body.groupId)

		pusher
			.subscribe($userGroup_id)
			.bind('injectMessage', (data: any) => {
				if (data.sender === $userName) {
					// 	applyMessageYoMe({ sender: $userName, message: data.message, createdAt: data.createdAt, messageId: data.messageId, $userName_id, $userGroup_id })
					const isYoMe = true
					applyMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, messageId: data.messageId, $userName_id, $userGroup_id }, isYoMe)
				} else {
					const isYoMe = false
					applyMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, messageId: data.messageId, $userName_id, $userGroup_id }, isYoMe)
					applyNavDataMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: 'PUBLIC' })
					// 	applyMessageLeft({ sender: data.sender, message: data.message, createdAt: data.createdAt, messageId: data.messageId, $userName_id, $userGroup_id })
				}
			})
			.bind('injectLike', (data: any) => {
				if (data.sender === $userName) {
					return
				} else {
					incrementLikes({ _id: data.messageId, $userName_id, likes: data.likes })
				}
			})
			.bind('incrementReplies', (data: any) => {
				// if (data.sender === $userName) {
				// return
				// } else {
				const topTotalReplies = document.getElementById('topTotalReplies?' + data.messageId)
				if (topTotalReplies) {
					topTotalReplies.innerHTML = likesabove10k(data.totalReplies) + ' replies'
				}
				const totalReplies = document.getElementById('totalReplies?' + data.messageId)
				if (totalReplies) {
					totalReplies.innerHTML = likesabove10k(data.totalReplies) + ' replies'
				}
				// }
			})
			.bind('incrementReplies', (data: any) => {
				incrementReplies({ _id: data.messageId, replies: data.totalReplies })
			})
	})

	const scrolltoBottom = () => {
		const middleScroll: any = document.getElementById('middleScroll')
		middleScroll.scrollTop = middleScroll.scrollHeight
	}

	let aboveSwitch = false
	const parseScroll = () => {
		const middleScroll: any = document.getElementById('middleScroll')
		if (middleScroll.scrollTop < -69) {
			aboveSwitch = true
		} else if (middleScroll.scrollTop > -69) {
			aboveSwitch = false
		}
	}
	const debouncedScroll = debounce(parseScroll, 333)

	const like = ({ _id, likes }: any) => {
		likeThatMsg({ _id, $userName_id, likes, $userGroup_id })
	}

	const goTo = (_id: any) => {
		window.location.pathname = '/Messages/' + _id
	}

	// const likeTop = ({ _id, likes }: any) => {
	// 	likeTopMessage({ _id, $userName_id, likes, $userGroup_id })
	// }

	onDestroy(() => {
		$currentPage = ''
	})
</script>

<svelte:head>
	<title>{data.body.groupName}</title>
	<meta name="description" content="This is a simple discourse on location:{data.body.groupName} as wassup.world is just a open chat room, where you can talk to any person anonymously or just using your name." />
</svelte:head>

<div class="hashContainer" id="middleScroll" on:scroll={debouncedScroll}>
	<div class="gradient" />

	<div class="scrollToBottom">
		{#if aboveSwitch === true}
			<button class="scrollButton" on:click={scrolltoBottom}><i class="fa fa-arrow-down" /></button>
		{/if}
	</div>

	<div class="margins margin-bottom" />
	<div id="textMessages" />
	<div class="hashMessagesContainer">
		{#each JSON.parse(data.body.messages) as { sender, message, createdAt, _id, likedPeople, likes, totalReplies }}
			{#if sender !== $userName}
				<div class="text sender">
					<p class="textShadows">
						<span style="color:var(--primary)">{sender}; </span>
						<span class="pageMessage">{message}</span>
						<span class="spanFlexLeft">
							<span class="timeSpan flexTime">{timeSince(createdAt)}</span>
							<button class="timeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span id="Replies_No?{_id}">{likesabove10k(totalReplies)} replies</span></p></button>
							<button on:click={like.bind(globalThis, { _id: _id, likes: likes })} class="timeSpan" style="margin-left: 10px;"><span class="optDark" id="LIKE_NO?{_id}">{likesabove10k(likes)}</span><i id="FA_SOLID?{_id}" class="{likedPeople.includes($userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
							<button on:click={goTo.bind(globalThis, _id)} class="timeSpan LikeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span style="font-family:UBold; margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
						</span>
					</p>
				</div>
			{:else if sender === $userName}
				<div class="text yoMe">
					<p class="textShadows">
						<span style="color:var(--secondary)">{sender}; </span>
						<span class="pageMessage">{message}</span>
						<span class="spanFlexRight">
							<button on:click={goTo.bind(globalThis, _id)} class="timeSpan LikeSpan" style="margin-right: 10px;"><p class="totalRepliespText"><span style="font-family:UBold; margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
							<button on:click={like.bind(globalThis, { _id: _id, likes: likes })} class="timeSpan" style="margin-right: 10px;"><span class="optDark" id="LIKE_NO?{_id}">{likesabove10k(likes)}</span><i id="FA_SOLID?{_id}" class="{likedPeople.includes($userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
							<button class="timeSpan" style="margin-right: 10px;"><p class="totalRepliespText"><span id="Replies_No?{_id}">{likesabove10k(totalReplies)} replies</span></p></button>
							<span class="timeSpan flexTime">{timeSince(createdAt)}</span>
						</span>
					</p>
				</div>
			{/if}
		{/each}
		<div class="infoBox" style={$isShowInfo ? 'scale: 1; opacity:1;' : 'scale: 0; padding:.2rem;margin-top:-2rem;margin-bottom:-6rem; opacity:0;'}><div class="infoData"><h1 class="comingSoon">Working on the mechanics to make it the best social-app ever designed/engineered.</h1></div></div>
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
							<p class="textShadows">
								<span style="color:var(--primary)">{sender}; </span>
								<span class="pageMessage">{message}</span>
								<span class="spanFlexLeft">
									<span class="timeSpan flexTime">{timeSince(createdAt)}</span>
									<button class="timeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span id="Replies_No?{_id}">{likesabove10k(totalReplies)} replies</span></p></button>
									<button on:click={like.bind(globalThis, { _id: _id, likes: likes })} class="timeSpan" style="margin-left: 10px;"><span class="optDark" id="TopLike_No?{_id}">{likesabove10k(likes)}</span><i id="FA_SOLID_TOP?{_id}" class="{likedPeople.includes($userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
									<button on:click={goTo.bind(globalThis, _id)} class="timeSpan LikeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span style="font-family:UBold; margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
								</span>
							</p>
						</div>
					{:else if sender === $userName}
						<div class="text yoMe">
							<p class="textShadows">
								<span style="color:var(--secondary)">{sender}; </span>
								<span class="pageMessage">{message}</span>
								<span class="spanFlexRight">
									<button on:click={goTo.bind(globalThis, _id)} class="timeSpan LikeSpan" style="margin-right: 10px;"><p class="totalRepliespText"><span style="font-family:UBold; margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
									<button on:click={like.bind(globalThis, { _id: _id, likes: likes })} class="timeSpan" style="margin-right: 10px;"><span class="optDark" id="TopLike_No?{_id}">{likesabove10k(likes)}</span><i id="FA_SOLID_TOP?{_id}" class="{likedPeople.includes($userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
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
	/* shifted to new-app.css */
</style>
