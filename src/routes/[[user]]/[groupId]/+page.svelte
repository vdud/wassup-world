<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import { userGroup_id } from '$lib/stores/userGroup_id';
	import { onMount } from 'svelte';
	import { pusher } from '$lib/bigFunctions/pusher';
	import { currentPage } from '$lib/stores/currentPage';
	import { userName } from '$lib/stores/userName';
	import { userName_id } from '$lib/stores/userName_id';
	import { currentPageHeaderData } from '$lib/stores/currentPageHeaderData';
	import { isFlex } from '$lib/stores/isFlex';
	import { applyMessage, applyNavDataMessage } from '$lib/bigFunctions/applyTextMessage';
	import { incrementLikes, incrementReplies } from '$lib/bigFunctions/likeThatMsg';
	import AllGroupMessages from '$lib/reusableComponents/AllGroupMessages.svelte';
	import { nature } from '$lib/stores/nature';
	import { isTypingData } from '$lib/stores/isTypingData';

	onMount(() => {
		$isFlex = false;
		$currentPage = data.body.nature;
		$userGroup_id = JSON.parse(data.groupId);
		$currentPageHeaderData = data.body.groupName;
		$nature = $currentPage;

		pusher
			.subscribe($userGroup_id)
			.bind('injectMessage', (data: any) => {
				if (data.sender === $userName) {
					const isYoMe = true;
					// applyMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, messageId: data.messageId, $userName_id, $userGroup_id, isYoMe });
				} else {
					const isYoMe = false;
					applyMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, messageId: data.messageId, $userName_id, $userGroup_id, isYoMe });
					applyNavDataMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: $currentPage });
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
</script>

<svelte:head>
	<title>{$currentPageHeaderData}</title>
	<meta name="description" content="This is a simple discourse on hashtag : {$currentPageHeaderData}, as wassup.world is just a open chat room, where you can talk to any person anonymously or just using your name." />
</svelte:head>

<AllGroupMessages {data} />
