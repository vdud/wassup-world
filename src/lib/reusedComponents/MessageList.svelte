<script lang="ts">
	import { onMount } from 'svelte'

	export let dataBodyMessages: any[]
	export let userName = ''
	export let userName_id = ''
	export let isShowInfo = false
	export let data = {}
	export let goTo: any
	export let like: any
	export let timeSince: any
	export let likesabove10k: any

	onMount(() => {
		// console.log(dataBodyMessages)
	})
</script>

{#each JSON.parse(data.body.messages) as { sender, message, createdAt, _id, likedPeople, likes, totalReplies }}
	{#if sender !== userName}
		<div class="text sender">
			<p class="textShadows">
				<span style="color:var(--primary)">{sender}; </span>
				<span class="pageMessage">{message}</span>
				<span class="spanFlexLeft">
					<span class="timeSpan flexTime">{timeSince(createdAt)}</span>
					<button class="timeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span id="Replies_No?{_id}">{likesabove10k(totalReplies)} replies</span></p></button>
					<button on:click={like.bind(globalThis, { _id: _id, likes: likes })} class="timeSpan replyLikeButton" style="margin-left: 10px;"><span class="optDark" id="LIKE_NO?{_id}">{likesabove10k(likes)}</span><i id="FA_SOLID?{_id}" class="{likedPeople.includes(userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
					<button on:click={goTo.bind(globalThis, _id)} class="timeSpan LikeSpan" style="margin-left: 10px;"><p class="totalRepliespText REPLY_TEXT"><span style=" margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
				</span>
			</p>
		</div>
	{:else if sender === userName}
		<div class="text yoMe">
			<p class="textShadows">
				<span style="color:var(--secondary)">{sender}; </span>
				<span class="pageMessage">{message}</span>
				<span class="spanFlexRight">
					<button on:click={goTo.bind(globalThis, _id)} class="timeSpan LikeSpan" style="margin-right: 10px;"><p class="totalRepliespText REPLY_TEXT"><span style=" margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
					<button on:click={like.bind(globalThis, { _id: _id, likes: likes })} class="timeSpan replyLikeButton" style="margin-right: 10px;"><span class="optDark" id="LIKE_NO?{_id}">{likesabove10k(likes)}</span><i id="FA_SOLID?{_id}" class="{likedPeople.includes(userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
					<button class="timeSpan" style="margin-right: 10px;"><p class="totalRepliespText"><span id="Replies_No?{_id}">{likesabove10k(totalReplies)} replies</span></p></button>
					<span class="timeSpan flexTime">{timeSince(createdAt)}</span>
				</span>
			</p>
		</div>
	{/if}
{/each}

<div class="infoBox" style={isShowInfo ? 'scale: 1; opacity:1;' : 'scale: 0; padding:.2rem;margin-top:-2rem;margin-bottom:-6rem; opacity:0;'}><div class="infoData"><h1 class="comingSoon">Working on the mechanics to make it the best social-app ever designed/engineered.</h1></div></div>
{#if JSON.parse(data.body.topLikes).length > 0}
	<div>
		<h1 class="topLikesHeader">
			<span class="topLikesHeaderSpan">TOP-LIKES</span>
		</h1>
	</div>
	<div class="hashMessagesContainer">
		{#each JSON.parse(data.body.topLikes) as { sender, message, createdAt, _id, likedPeople, likes, totalReplies }}
			{#if sender !== userName}
				<div class="text sender">
					<p class="textShadows">
						<span style="color:var(--primary)">{sender}; </span>
						<span class="pageMessage">{message}</span>
						<span class="spanFlexLeft">
							<span class="timeSpan flexTime">{timeSince(createdAt)}</span>
							<button class="timeSpan" style="margin-left: 10px;"><p class="totalRepliespText"><span id="Replies_No?{_id}">{likesabove10k(totalReplies)} replies</span></p></button>
							<button on:click={like.bind(globalThis, { _id: _id, likes: likes })} class="timeSpan replyLikeButton" style="margin-left: 10px;"><span class="optDark" id="TopLike_No?{_id}">{likesabove10k(likes)}</span><i id="FA_SOLID_TOP?{_id}" class="{likedPeople.includes(userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
							<button on:click={goTo.bind(globalThis, _id)} class="timeSpan LikeSpan" style="margin-left: 10px;"><p class="totalRepliespText REPLY_TEXT"><span style=" margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
						</span>
					</p>
				</div>
			{:else if sender === userName}
				<div class="text yoMe">
					<p class="textShadows">
						<span style="color:var(--secondary)">{sender}; </span>
						<span class="pageMessage">{message}</span>
						<span class="spanFlexRight">
							<button on:click={goTo.bind(globalThis, _id)} class="timeSpan LikeSpan" style="margin-right: 10px;"><p class="totalRepliespText REPLY_TEXT"><span style=" margin-right: 5px">REPLY</span><span><i class="fa fa-square-up-right" /></span></p></button>
							<button on:click={like.bind(globalThis, { _id: _id, likes: likes })} class="timeSpan replyLikeButton" style="margin-right: 10px;"><span class="optDark" id="TopLike_No?{_id}">{likesabove10k(likes)}</span><i id="FA_SOLID_TOP?{_id}" class="{likedPeople.includes(userName_id) ? 'fa-solid' : 'fa-regular'} fa-heart optDark" style="margin:3px;" /></button>
							<button class="timeSpan" style="margin-right: 10px;"><p class="totalRepliespText"><span id="Replies_No?{_id}">{likesabove10k(totalReplies)} replies</span></p></button>
							<span class="timeSpan flexTime">{timeSince(createdAt)}</span>
						</span>
					</p>
				</div>
			{/if}
		{/each}
	</div>
{/if}
