<script lang="ts">
	import { userName } from '$lib/stores/userName'
	import { currentPageHeaderData } from '$lib/stores/currentPageHeaderData'
	import { currentPage } from '$lib/stores/currentPage'
	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { onDestroy, onMount } from 'svelte'
	import { pusher } from '$lib/bigFunctions/pusher'
	import type { PageData } from './$types'
	import { isFlex } from '$lib/stores/isFlex'
	import { applyMessage, applyNavDataMessage } from '$lib/bigFunctions/applyTextMessage'
	import { userName_id } from '$lib/stores/userName_id'
	import { incrementLikes, incrementReplies } from '$lib/bigFunctions/likeThatMsg'
	import AllGroupMessages from '$lib/reusedComponents/AllGroupMessages.svelte'

	export let data: PageData

	onMount(() => {
		$isFlex = false
		$currentPageHeaderData = data.body.groupName

		$currentPage = 'PUBLIC'
		$userGroup_id = JSON.parse(data.body.groupId)

		pusher
			.subscribe($userGroup_id)
			.bind('injectMessage', (data: any) => {
				if (data.sender === $userName) {
					const isYoMe = true
					applyMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, messageId: data.messageId, $userName_id, $userGroup_id }, isYoMe)
				} else {
					const isYoMe = false
					applyMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, messageId: data.messageId, $userName_id, $userGroup_id }, isYoMe)
					applyNavDataMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: 'PUBLIC' })
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
	<title>{data.body.groupName}</title>
	<meta name="description" content="See what's happening!" />
</svelte:head>

<AllGroupMessages {data} />
