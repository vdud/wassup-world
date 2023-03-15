<script lang="ts">
	import { userName } from '$lib/stores/userName'
	import { currentGroupName } from '$lib/stores/currentGroupName'
	import { currentPage } from '$lib/stores/currentPage'
	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { onDestroy, onMount } from 'svelte'
	import { pusher } from '$lib/pusher'
	import type { PageData } from './$types'
	import { isFlex } from '$lib/stores/isFlex'
	export let data: PageData

	// console.log('data', data)

	onMount(() => {
		$isFlex = false
		$currentGroupName = data.body.groupName

		$currentPage = 'PUB'
		$userGroup_id = JSON.parse(data.body.groupId)

		pusher.subscribe($userGroup_id).bind('inserted_Put', (data: any) => {
			const textMessages: any = document.getElementById('textMessages')

			const div = document.createElement('div')
			div.classList.add('text')
			div.classList.add('newText')
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
	})
</script>

<svelte:head>
	<title>{data.body.groupName}</title>
	<meta name="description" content="This is a simple discourse on location:{data.body.groupName} as wassup.world is just a open chat room, where you can talk to any person anonymously or just using your name." />
</svelte:head>

<div class="hashContainer">
	<div class="margins margin-bottom" />
	<div id="textMessages" />
	<div class="hashMessagesContainer">
		{#each JSON.parse(data.body.messages) as { sender, message }}
			{#if sender !== $userName}
				<div class="text sender"><p><span style="color:var(--primary)">{sender}; </span><span style="color:var(--secondaryThemeInverted)">{message}</span></p></div>
			{:else if sender === $userName}
				<div class="text yoMe"><p><span style="color:var(--secondary)">{sender}; </span><span style="color:var(--secondaryThemeInverted)">{message}</span></p></div>
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
