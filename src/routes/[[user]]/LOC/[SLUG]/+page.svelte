<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { onMount, onDestroy } from 'svelte'
	import { pusher } from '$lib/pusher'
	import { canSend } from '$lib/stores/canSend'
	import { currentPage } from '$lib/stores/currentPage'
	import { isPUBLIC } from '$lib/stores/isPUBLIC'
	import { userName } from '$lib/stores/userName'
	import { userName_id } from '$lib/stores/userName_id'
	import { json } from '@sveltejs/kit'
	import { currentGroupName } from '$lib/stores/currentGroupName'
	import { isFlex } from '$lib/stores/isFlex'
	import { timeSince } from '$lib/timeFormat'
	import { currentGroupCreatedAt } from '$lib/stores/currentGroupCreatedAt'

	onMount(() => {
		$isFlex = false
		$canSend = false
		$isPUBLIC = false
		$currentPage = 'LOC'
		$userGroup_id = JSON.parse(data.groupId)
		$currentGroupCreatedAt = data.body.createdAt
		// console.log(JSON.parse(data.body.data))

		$currentGroupName = data.body.groupName
		pusher.subscribe($userGroup_id).bind('inserted_Put', (data: any) => {
			if (data.sender === $userName) {
				return
			} else {
				// if (data.sender !== $userName) {
				const textMessages: any = document.getElementById('textMessages')

				const div = document.createElement('div')
				div.classList.add('text')
				// div.classList.add('newText')
				div.classList.add('sender')
				const p = document.createElement('p')
				const span1 = document.createElement('span')
				span1.style.color = 'var(--primary)'
				span1.innerText = data.sender + '; '
				const span2 = document.createElement('span')
				span2.style.color = 'var(--secondaryThemeInverted)'
				span2.innerText = data.message

				const span3 = document.createElement('span')
				span3.classList.add('timeSpan')
				span3.classList.add('timeSpanRight')
				span3.innerText = timeSince(data.createdAt)

				p.appendChild(span1)
				p.appendChild(span2)
				p.appendChild(span3)
				div.appendChild(p)

				textMessages.appendChild(div)
			}
		})
	})

	onDestroy(() => {
		$currentPage = ''
	})
</script>

<svelte:head>
	<title>📍{data.body.groupName}</title>
	<meta name="description" content="This is a simple discourse on location:{data.body.groupName} as wassup.world is just a open chat room, where you can talk to any person anonymously or just using your name." />
</svelte:head>

<div class="hashContainer">
	<div class="margins margin-bottom" />
	<div id="textMessages" />
	<div class="hashMessagesContainer">
		{#each JSON.parse(data.body.data) as message}
			{#if message.sender !== $userName}
				<div class="text sender"><p><span style="color:var(--primary)">{message.sender}; </span><span style="color:var(--secondaryThemeInverted)">{message.message}</span><span class="timeSpan timeSpanRight">{timeSince(message.createdAt)}</span></p></div>
			{:else if message.sender === $userName}
				<div class="text yoMe"><p><span style="color:var(--secondary)">{message.sender}; </span><span style="color:var(--secondaryThemeInverted)">{message.message}</span><span class="timeSpan timeSpanLeft">{timeSince(message.createdAt)}</span></p></div>
			{/if}
		{/each}
	</div>
	<div class="margins margin-top" />
</div>

<style>
	#textMessages {
		width: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;

		background-color: var(--primaryTheme);
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

	@media screen and (max-width: 768px) {
		.text {
			width: 75%;
		}
	}

	@media screen and (min-width: 1410px) {
	}

	/* Designing for scroll-bar */
</style>
