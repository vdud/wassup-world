<script lang="ts">
	import { onMount } from 'svelte'

	import { debounce } from '$lib/bigFunctions/debounce'
	import { timeSince } from '$lib/bigFunctions/timeFormat'
	import { likesabove10k, likeThatMsg } from '$lib/bigFunctions/likeThatMsg'

	import { userName } from '$lib/stores/userName'
	import { userName_id } from '$lib/stores/userName_id'
	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { isFlex } from '$lib/stores/isFlex'
	import AboutGroup from './AboutGroup.svelte'
	import GroupAd from './GroupAd.svelte'

	const like = ({ _id, likes }: any) => {
		likeThatMsg({ _id, $userName_id, likes, $userGroup_id })
	}

	const goTo = (_id: any) => {
		$isFlex = true
		window.location.pathname = '/Messages/' + _id
	}

	onMount(() => {})
	export let data = {}

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
	const debouncedScroll = debounce(parseScroll, 300)
</script>

{#if aboveSwitch === true}
	<div class="scrollToBottom">
		<button class="scrollButton" on:click={scrolltoBottom}><i class="fa fa-arrow-down" /></button>
	</div>
{/if}

<div class="hashContainer" id="middleScroll" on:scroll={debouncedScroll}>
	<!-- <div class="hashContainer" id="middleScroll" on:scroll={parseScroll}> -->
	<div class="margins margin-bottom" />
	<!-- <GroupAd /> -->
	<div id="textMessages" />
	<div class="hashMessagesContainer">
		{#each JSON.parse(data.body.messages) as { sender, message, createdAt, _id, likedPeople, likes, totalReplies }}
			{#if sender !== $userName}
				<div class="text sender">
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
						<span class="spanFlexRight">
							<button on:click={goTo.bind(globalThis, _id)} class="timeSpan LikeSpan" style="margin-right: 10px;"><p class="totalRepliespText REPLY_TEXT"><span style=" margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
							<button on:click={like.bind(globalThis, { _id: _id, likes: likes })} class="timeSpan replyLikeButton" style="margin-right: 10px;"><span class="optDark" id="LIKE_NO?{_id}">{likesabove10k(likes)}</span><i id="FA_SOLID?{_id}" class="{likedPeople.includes($userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
							<button class="timeSpan" style="margin-right: 10px;"><p class="totalRepliespText"><span id="Replies_No?{_id}">{likesabove10k(totalReplies)} replies</span></p></button>
							<span class="timeSpan flexTime">{timeSince(createdAt)}</span>
						</span>
					</p>
				</div>
			{/if}
		{/each}

		<AboutGroup />

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
</style>
