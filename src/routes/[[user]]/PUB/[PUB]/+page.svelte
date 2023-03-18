<script lang="ts">
	import { userName } from '$lib/stores/userName'
	import { currentGroupName } from '$lib/stores/currentGroupName'
	import { currentPage } from '$lib/stores/currentPage'
	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { onDestroy, onMount } from 'svelte'
	import { pusher } from '$lib/pusher'
	import type { PageData } from './$types'
	import { isFlex } from '$lib/stores/isFlex'
	import { timeSince } from '$lib/timeFormat'
	import { isShowInfo } from '$lib/stores/isShowInfo'
	import { currentGroupCreatedAt } from '$lib/stores/currentGroupCreatedAt'
	import { debounce } from '$lib/debounce'
	import { applyNavDataMessage } from '$lib/applyTextMessage'
	// import { middleScroll } from '$lib/stores/middleScroll'
	export let data: PageData

	// console.log('data', data)

	onMount(() => {
		$isFlex = false
		$currentGroupName = data.body.groupName
		$currentGroupCreatedAt = data.body.createdAt

		$currentPage = 'PUBLIC'
		$userGroup_id = JSON.parse(data.body.groupId)

		pusher.subscribe($userGroup_id).bind('inserted_Put', (data: any) => {
			if (data.sender === $userName) {
				return
			} else {
				applyNavDataMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId })

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
				span3.classList.add('spanFlexLeft')
				const span4 = document.createElement('span')
				span4.classList.add('timeSpan')
				const span5 = document.createElement('span')
				span5.classList.add('timeSpan')
				span5.classList.add('likeSPan')
				span5.style.marginRight = '10px'

				// span3.append(span5)
				span3.append(span4)

				// span4.classList.add('timeSpanLeft')
				span4.innerText = timeSince(data.createdAt)

				p.appendChild(span1)
				p.appendChild(span2)
				p.appendChild(span3)
				div.appendChild(p)

				textMessages.appendChild(div)
			}
		})
	})

	const scrolltoBottom = () => {
		// $middleScroll.scrollTop = $middleScroll.scrollHeight
		const middleScroll: any = document.getElementById('middleScroll')
		middleScroll.scrollTop = middleScroll.scrollHeight
		// console.log('$middleScroll', $middleScroll)
	}

	let aboveSwitch = false
	const parseScroll = () => {
		const middleScroll: any = document.getElementById('middleScroll')
		if (middleScroll.scrollTop < -69) {
			// console.log('middleScroll.scrollTop', middleScroll.scrollTop)
			aboveSwitch = true

			// console.log('aboveSwitch', aboveSwitch)
		} else if (middleScroll.scrollTop > -69) {
			// console.log('middleScroll.scrollTop', middleScroll.scrollTop)
			aboveSwitch = false
			// console.log('aboveSwitch', aboveSwitch)
		}
	}

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

<div class="hashContainer" id="middleScroll" on:scroll={debounce(parseScroll, 1000)}>
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
						<span style="color:var(--secondaryThemeInverted)">{message}</span>
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
						<span style="color:var(--secondaryThemeInverted)">{message}</span>
						<span class="spanFlexRight">
							<span class="timeSpan " style="margin-right: 10px;">{timeSince(createdAt)}</span>
							<span on:click={like} class="timeSpan LikeSpan" style={isLiked ? 'animation: zoomIn 133ms ease-in-out' : ''}>{isLiked ? 'liked' : 'like'}</span>
						</span>
					</p>
				</div>
			{/if}
		{/each}
		<div class="infoBox" style={$isShowInfo ? 'scale: 1; opacity:1;' : 'scale: 0; padding:.2rem;margin-top:-2rem;margin-bottom:-6rem; opacity:0;'}><div class="infoData"><h1 class="comingSoon">COMING SOON...</h1></div></div>
	</div>
	<div class="margins margin-top" />
</div>

<style>
	#textMessages {
		width: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		animation: fadeIn 300ms both ease-in-out;
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

		pointer-events: all;
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
	/* 
	@media screen and (max-width: 768px) {
		.text {
			width: 75%;
		}
	} */

	@media screen and (min-width: 1410px) {
	}

	/* Designing for scroll-bar */
</style>
