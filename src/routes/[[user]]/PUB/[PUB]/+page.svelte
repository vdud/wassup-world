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
	import { applyMessageLeft, applyNavDataMessage } from '$lib/bigFunctions/applyTextMessage'
	export let data: PageData

	onMount(() => {
		$isFlex = false
		$currentPageHeaderData = data.body.groupName
		$currentGroupCreatedAt = data.body.createdAt

		$currentPage = 'PUBLIC'
		$userGroup_id = JSON.parse(data.body.groupId)

		pusher.subscribe($userGroup_id).bind('injectMessage', (data: any) => {
			if (data.sender === $userName) {
				return
			} else {
				applyNavDataMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: 'PUBLIC' })
				applyMessageLeft({ sender: data.sender, message: data.message, createdAt: data.createdAt })
			}
		})
	})

	console.log('data', data)

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

	let isLiked = false
	const like = () => {
		isLiked = !isLiked
	}

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
		{#each JSON.parse(data.body.messages) as { sender, message, createdAt }}
			{#if sender !== $userName}
				<div class="text sender">
					<p class="textShadows">
						<span style="color:var(--primary)">{sender}; </span>
						<span class="pageMessage">{message}</span>
						<span class="spanFlexLeft">
							<span on:click={like} class="timeSpan LikeSpan" style={isLiked ? 'animation: zoomIn 133ms ease-in-out' : ''}>{isLiked ? 'liked' : 'like'}</span>
							<span class="timeSpan " style="margin-left: 10px;">{timeSince(createdAt)}</span>
						</span>
					</p>
				</div>
			{:else if sender === $userName}
				<div class="text yoMe">
					<p class="textShadows">
						<span style="color:var(--secondary)">{sender}; </span>
						<span class="pageMessage">{message}</span>
						<span class="spanFlexRight">
							<span class="timeSpan " style="margin-right: 10px;">{timeSince(createdAt)}</span>
							<span on:click={like} class="timeSpan LikeSpan" style={isLiked ? 'animation: zoomIn 133ms ease-in-out' : ''}>{isLiked ? 'liked' : 'like'}</span>
						</span>
					</p>
				</div>
			{/if}
		{/each}
		<div class="infoBox" style={$isShowInfo ? 'scale: 1; opacity:1;' : 'scale: 0; padding:.2rem;margin-top:-2rem;margin-bottom:-6rem; opacity:0;'}><div class="infoData"><h1 class="comingSoon">I'm working with business owners to get the best deals for you!</h1></div></div>
	</div>
	<div class="margins margin-top" />
</div>

<style>
	/* shifted to new-app.css */
</style>
