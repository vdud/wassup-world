<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { onMount, onDestroy } from 'svelte'
	import { pusher } from '$lib/bigFunctions/pusher'
	import { canSend } from '$lib/stores/canSend'
	import { currentPage } from '$lib/stores/currentPage'
	import { isPUBLIC } from '$lib/stores/isPUBLIC'
	import { userName } from '$lib/stores/userName'
	import { userName_id } from '$lib/stores/userName_id'
	import { json } from '@sveltejs/kit'
	import { currentPageHeaderData } from '$lib/stores/currentPageHeaderData'
	import { isFlex } from '$lib/stores/isFlex'
	import { timeSince } from '$lib/bigFunctions/timeFormat'
	import { currentGroupCreatedAt } from '$lib/stores/currentGroupCreatedAt'
	import { isShowInfo } from '$lib/stores/isShowInfo'
	import { isLocked } from '$lib/stores/isLocked'
	import { debounce } from '$lib/bigFunctions/debounce'
	import { applyMessageLeft, applyNavDataMessage } from '$lib/bigFunctions/applyTextMessage'

	onMount(() => {
		$isFlex = false
		$canSend = false
		$isPUBLIC = false
		$currentPage = 'HASHTAGS'
		$userGroup_id = JSON.parse(data.groupId)
		$currentPageHeaderData = data.body.groupName
		$currentGroupCreatedAt = data.body.createdAt

		pusher.subscribe($userGroup_id).bind('injectMessage', (data: any) => {
			if (data.sender === $userName) {
				return
			} else {
				applyNavDataMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: 'PUBLIC' })
				applyMessageLeft({ sender: data.sender, message: data.message, createdAt: data.createdAt })
			}
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
			console.log('middleScroll.scrollTop', middleScroll.scrollTop)
			aboveSwitch = true
		} else if (middleScroll.scrollTop > -69) {
			console.log('middleScroll.scrollTop', middleScroll.scrollTop)
			aboveSwitch = false
		}
	}
	const debouncedScroll = debounce(parseScroll, 300)

	let isLiked = false
	const like = () => {
		isLiked = !isLiked
	}
</script>

<svelte:head>
	<title>#{data.body.groupName}</title>
	<meta name="description" content="This is a simple discourse on hashtag : #{data.body.groupName}, as wassup.world is just a open chat room, where you can talk to any person anonymously or just using your name." />
</svelte:head>

{#if aboveSwitch === true}
	<div class="scrollToBottom">
		<button class="scrollButton" on:click={scrolltoBottom}><i class="fa fa-arrow-down" /></button>
	</div>
{/if}

<div class="hashContainer" id="middleScroll" on:scroll={debouncedScroll}>
	<!-- <div class="hashContainer" id="middleScroll" on:scroll={parseScroll}> -->
	<div class="margins margin-bottom" />
	<div id="textMessages" />
	<div class="hashMessagesContainer">
		{#each JSON.parse(data.body.data) as { sender, message, createdAt }}
			{#if sender !== $userName}
				<div class="text sender">
					<p>
						<span style="color:var(--primary)">{sender}; </span>
						<span style="color:var(--secondaryThemeInverted)">{message}</span>
						<span class="spanFlexLeft">
							<span on:click={like} class="timeSpan LikeSpan" style={isLiked ? 'animation: zoomIn 133ms ease-in-out' : ''}>{isLiked ? 'liked' : 'like'}</span>
							<span class="timeSpan " style="margin-left: 10px;">{timeSince(createdAt)}</span>
						</span>
					</p>
				</div>
			{:else if sender === $userName}
				<div class="text yoMe">
					<p>
						<span style="color:var(--secondary)">{sender}; </span>
						<span style="color:var(--secondaryThemeInverted)">{message}</span>
						<span class="spanFlexRight">
							<span class="timeSpan " style="margin-right: 10px;">{timeSince(createdAt)}</span>
							<span on:click={like} class="timeSpan LikeSpan" style={isLiked ? 'animation: zoomIn 133ms ease-in-out' : ''}>{isLiked ? 'liked' : 'like'}</span>
						</span>
					</p>
				</div>
			{/if}
		{/each}
		<div class="infoBox" style={$isShowInfo ? 'scale: 1; opacity:1; margin-top:0' : 'scale: 0;margin-top:0;margin-bottom:-100px; opacity:0;'}><div class="infoData"><h1 class="comingSoon">I'm working with business owners to get the best deals for you!</h1></div></div>
	</div>
	<div class="margins margin-top" />
</div>

<style>
	/* shifted to new-app.css */
</style>
