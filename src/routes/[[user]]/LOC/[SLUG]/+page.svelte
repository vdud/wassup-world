<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { onMount, onDestroy } from 'svelte'
	import { pusher } from '$lib/bigFunctions/pusher'
	import { currentPage } from '$lib/stores/currentPage'
	import { userName } from '$lib/stores/userName'
	import { userName_id } from '$lib/stores/userName_id'
	import { currentPageHeaderData } from '$lib/stores/currentPageHeaderData'
	import { isFlex } from '$lib/stores/isFlex'
	import { applyMessage, applyNavDataMessage } from '$lib/bigFunctions/applyTextMessage'
	import { incrementLikes, incrementReplies } from '$lib/bigFunctions/likeThatMsg'
	import AllGroupMessages from '$lib/reusedComponents/AllGroupMessages.svelte'

	onMount(() => {
		$isFlex = false
		$currentPage = 'LOCATIONS'
		$userGroup_id = JSON.parse(data.groupId)
		$currentPageHeaderData = data.body.groupName

		pusher
			.subscribe($userGroup_id)
			.bind('injectMessage', (data: any) => {
				if (data.sender === $userName) {
					const isYoMe = true
					applyMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, messageId: data.messageId, $userName_id, $userGroup_id }, isYoMe)
				} else {
					const isYoMe = false
					applyMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, messageId: data.messageId, $userName_id, $userGroup_id }, isYoMe)
					applyNavDataMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: 'LOCATIONS' })
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

	onDestroy(() => {
		$currentPage = ''
	})
</script>

<svelte:head>
	<!-- <title>📍{data.body.groupName}</title> -->
	<title>🎉 📍{data.body.groupName} - Socialize & Engage on Our App 🌐</title>
	<meta name="description" content="📍:{data.body.groupName} - Join wassup.world's open chat, chat anonymously or with your name, and connect with others frankly!" />
</svelte:head>

<AllGroupMessages {data} />
