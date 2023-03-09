<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { onMount, onDestroy } from 'svelte'
	import { json } from '@sveltejs/kit'
	import { canSendReciever } from '$lib/stores/canSendReciever'
	import { userName_id } from '$lib/stores/userName_id'
	import { canSend } from '$lib/stores/canSend'
	import { pusher } from '$lib/pusher'
	import { currentPage } from '$lib/stores/currentPage'
	import { userName } from '$lib/stores/userName'
	import { isPUBLIC } from '$lib/stores/isPUBLIC'
	import { isPUBLICgroupData } from '$lib/stores/isPUBLICgroupData'
	import { loginResponseData } from '$lib/stores/loginResponseData'
	import { isFlex } from '$lib/stores/isFlex'
	import { currentGroupName } from '$lib/stores/currentGroupName'

	// console.log('data', JSON.parse(data.body.data))
	// console.log('data', data)
	// $canSend = false

	onMount(() => {
		$isPUBLIC = true
		$currentPage = 'PUB'
		$userGroup_id = JSON.parse(data.body.groupId)
		const bodyData = JSON.parse(data.body.data)
		$isPUBLICgroupData = JSON.parse(data.body.data)
		console.log('data', data)
		$currentGroupName = data.body.groupName

		// setTimeout(() => {
		if ($isPUBLIC === true && $isFlex === false) {
			JSON.parse(data.body.data).allUsers.forEach((user: any) => {
				console.log('user._id', user._id)
				console.log('$userName_id', $userName_id)
				if (user._id === $userName_id) {
					$canSend = true
					console.log('$canSend', $canSend)
					$currentPage = 'PUB'
				} else {
					$canSendReciever = user._id
					console.log('$canSendReciever', $canSendReciever)
				}
			})
		}
		// }, 2000)
		pusher.subscribe(JSON.parse(data.body.groupId)).bind('inserted_Put', (data: any) => {
			const textMessages: any = document.getElementById('textMessages')

			const div = document.createElement('div')
			div.classList.add('text')
			if (data.sender === $userName) {
				div.classList.add('yoMe')
			} else {
				div.classList.add('sender')
			}
			const p = document.createElement('p')
			const span1 = document.createElement('span')
			if (data.sender === $userName) {
				span1.style.color = 'var(--secondary)'
			} else {
				span1.style.color = 'var(--primary)'
			}
			span1.innerText = data.sender + '; '
			const span2 = document.createElement('span')
			span2.style.color = 'var(--secondaryThemeInverted)'
			span2.innerText = data.message
			p.appendChild(span1)
			p.appendChild(span2)
			div.appendChild(p)

			textMessages.appendChild(div)
		})

		// JSON.parse(data.body.data).allUsers.forEach((user: any) => {
		// 	console.log(user._id)
		// 	console.log($userName_id)
		// 	if (user._id !== $userName_id) {
		// 		$canSend = true
		// 		console.log('$canSend?', $canSend)
		// 	} else if (user._id === $userName_id) {
		// 		$canSend = false
		// 		console.log('$canSend', $canSend)
		// 	}
		// })

		// if ($isPUBLIC === true) {
		// 	$isPUBLICgroupData.allUsers.forEach((user: any) => {
		// 		// console.log(user._id)
		// 		// console.log($userName_id)
		// 		if (user._id !== $userName_id) {
		// 		} else if (user._id === $userName_id) {
		// 		}
		// 	})
		// }
	})

	onDestroy(() => {
		$isPUBLIC = false
	})
</script>

<svelte:head>
	<title>{data.body.groupName}</title>
	<meta name="description" content="This is a simple discourse on location:{data.body.groupName} as wassup.world is just a open chat room, where you can talk to any person anonymously or just using your name." />
</svelte:head>

<div class="hashContainer">
	<div class="margins margin-bottom" />
	<div class="hashMessagesContainer">
		<div id="textMessages" />
		<!-- {#each JSON.parse(data.body.messages) as message}
			{#if message.sender !== $userName}
				<div class="text sender"><p><span style="color:var(--primary)">{message.sender}; </span><span style="color:var(--secondaryThemeInverted)">{message.message}</span></p></div>
			{:else if message.sender === $userName}
				<div class="text yoMe"><p><span style="color:var(--secondary)">{message.sender}; </span><span style="color:var(--secondaryThemeInverted)">{message.message}</span></p></div>
			{/if}
		{/each} -->
	</div>
	<div class="margins margin-top" />
</div>

<style>
	#textMessages {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column-reverse;
		flex-wrap: wrap;
	}
	.margin-bottom {
		padding: 1.8rem;
	}
	.margin-top {
		padding: 4rem;
	}
	.hashContainer {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column-reverse;

		overflow: hidden;
		overflow-y: scroll;
	}
	.hashMessagesContainer {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column-reverse;
		flex-wrap: wrap;
	}

	@media screen and (min-width: 1410px) {
	}

	/* Designing for scroll-bar */
</style>
