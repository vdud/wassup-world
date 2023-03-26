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
	import { applyMessage, applyNavDataMessage } from '$lib/bigFunctions/applyTextMessage'
	import { likeThatMsg, likesabove10k, incrementLikes, incrementReplies } from '$lib/bigFunctions/likeThatMsg'
	import MessageList from '$lib/reusedComponents/MessageList.svelte'

	onMount(() => {
		$isFlex = false
		$canSend = false
		$isPUBLIC = false
		$currentPage = 'HASHTAGS'
		$userGroup_id = JSON.parse(data.groupId)
		$currentPageHeaderData = data.body.groupName
		$currentGroupCreatedAt = data.body.createdAt

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
					applyNavDataMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: 'HASHTAGS' })
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
	const debouncedScroll = debounce(parseScroll, 300)

	const like = ({ _id, likes }: any) => {
		likeThatMsg({ _id, $userName_id, likes, $userGroup_id })
	}

	const goTo = (_id: any) => {
		$isFlex = true
		window.location.pathname = '/Messages/' + _id
	}

	// const likeTop = ({ _id, likes }: any) => {
	// 	likeTopMessage({ _id, $userName_id, likes, $userGroup_id })
	// }
</script>

<svelte:head>
	<title>#{data.body.groupName}</title>
	<meta name="description" content="This is a simple discourse on hashtag : #️⃣{data.body.groupName}, as wassup.world is just a open chat room, where you can talk to any person anonymously or just using your name." />
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
		<MessageList userName={$userName} userName_id={$userName_id} isShowInfo={$isShowInfo} {data} {goTo} {like} {timeSince} {likesabove10k} />
	</div>
	<div class="margins margin-top" />
</div>

<style>
	/* shifted to new-app.css */
</style>
