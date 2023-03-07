<script lang="ts">
	let rows
	import { textAreaHeight } from '$lib/stores/textAreaHeight'
	import { fullScreen } from '$lib/stores/fullScreen'
	import { canSend } from '$lib/stores/canSend'
	import { nature } from '$lib/stores/nature'
	import { userName } from '$lib/stores/userName'
	import { onDestroy, onMount } from 'svelte'
	import { currentGroupMembers } from '$lib/stores/currentGroupMembers'
	import { currentGroupId } from '$lib/stores/currentGroupId'
	import { user_message } from '$lib/stores/user_message'
	import { canSendReciever } from '$lib/stores/canSendReciever'
	import { currentGroupData } from '$lib/stores/currentGroupData'

	import { pusher } from '$lib/pusher'
	import Pusher from 'pusher-js'
	import { userGroup_id } from '$lib/stores/userGroup_id'

	// $: $user_message.substring(0, 999)
	// $: $user_message = `${$user_message}`

	function autoResize(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			if ($canSend === true) {
				singleSocketWorker()
			} else if ($canSend === false) {
				socketWorker()
			}
			$user_message = ''
		} else {
			const ta: any = document.getElementById('textarea')
			const div: any = document.getElementById('ta-frame')
			setTimeout(function () {
				ta.style.cssText = 'height:0px'
				var height = Math.min(30 * 5, ta.scrollHeight)
				div.style.cssText = 'height:' + height + 'px'
				ta.style.cssText = 'height:' + height + 'px'
			}, 100)
		}
	}
	const socketWorker = async () => {
		const message = $user_message.trim().slice(0, 999)

		console.log(message)
		if (message === '') {
			return
		}
		const time = new Date()

		const res = await fetch('/api/textAreaMessages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message, $userGroup_id }),
		})
		const response = await res.json()
		console.log(response)
		if (!res.ok) {
			alert(response.message)
		}

		$user_message = ''
	}
	const singleSocketWorker = async () => {
		const message = $user_message.trim().slice(0, 999)
		console.log(message)
		if (message === '') {
			return
		}
		const time = new Date()

		const res = await fetch('/api/singleTextAreaMessages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message, $canSendReciever, $userGroup_id }),
		})
		const response = await res.json()
		console.log(response)
		if (!res.ok) {
			alert(response.message)
		}

		$user_message = ''
	}
</script>

<div class="textArea">
	<div class="textBox">
		{#if $nature === 'HASHTAG' || $nature === 'LOCATION' || $canSend === true}
			<div id="chat" class="switch">
				<div id="ta-frame">
					<textarea name="userMessage" id="textarea" spellcheck="false" minlength="1" maxlength="999" cols="0" rows="1" bind:value={$user_message} on:keydown={autoResize} />
				</div>
			</div>
			{#if $canSend === false}
				<div class="{$fullScreen ? 'hidden' : 'sendButton'} switch">
					<button class="sendBtn fa fa-paper-plane  " id="formDataButton" on:click={socketWorker} />
				</div>
			{:else if $canSend === true}
				<div class="{$fullScreen ? 'hidden' : 'sendButton'} switch">
					<button class="sendBtn fa fa-paper-plane  " id="formDataButton" on:click={singleSocketWorker} />
				</div>
			{/if}
		{:else}
			<div id="chat">
				<div class="lock switch"><i class="fa fa-lock" /></div>
			</div>
		{/if}
	</div>
</div>

<style>
	.switch {
		animation: fade 200ms both ease-in-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.fa-lock {
		color: var(--primaryThemeInverted);
	}
	.textArea {
		height: 100%;
		width: 100%;

		display: flex;
		align-items: center;
		justify-content: center;

		background-color: transparent;

		margin: auto;
	}
	.textBox {
		height: 80%;
		width: 98%;

		position: relative;
	}

	.lock {
		background-color: var(--primaryTheme);
		position: absolute;
		width: 100%;
		height: 2.1rem;
		opacity: var(--dull);

		border-radius: calc(var(--borderRadius) / 2);
		margin-bottom: 6px;

		display: flex;
		align-items: center;
		justify-content: center;

		box-shadow: var(--boxInsetShadows);
	}
	.hidden {
		display: none;
	}

	#chat {
		display: flex;
		flex-direction: column-reverse;
		height: 100%;
		width: calc(100% - 6px);

		position: relative;
	}
	#ta-frame {
		margin: 0;
		height: 100%;

		display: flex;
		align-items: flex-end;
		padding-right: 6px;
		/* padding: 10px 10px; */
		/* border-top: 1px solid gray; */
		/* background-color: #eee; */
	}
	textarea {
		overflow: hidden;
		margin: 0;
		/* padding: 15px; */
		border: 0;
		outline: 0;
		height: 1.65rem;
		width: 100%;
		font-size: 1rem;
		resize: none;
		color: var(--tertiaryThemeInverted);
		padding: 0.25rem 1rem;
		font-family: ULight;
		border-radius: var(--borderRadius);
		/* transition: all 150ms cubic-bezier( 0.4, 0, 0.2, 1 ) ; */
		/* background-color: #1f1f1f; */
		background-color: #1a1a1a;
		box-shadow: var(--boxInsetShadows);

		transform: translateY(-5px);
	}
	textarea:focus {
		/* background-color: #1f1f1f; */
		border: none;
		background-color: #1a1a1a;
		box-shadow: var(--boxInsetShadows);
	}
	/* .form {
		width: 100%;
		height: 100%;
		max-height: 16rem;
		margin: 0;

		padding: 0.66rem;
		border-top: 1px solid #9997;

		transition: all 150ms ease-in-out;
	} */
	/* .formDiv {
		display: flex;
		flex-direction: column-reverse;

		height: auto;
		
		position: relative;
	} */

	/* margin: 1em; */
	/* margin: auto; */

	textarea:focus,
	button:focus,
	button:active,
	textarea:active {
		outline: none;
	}

	.sendBtn {
		position: absolute;
		bottom: calc(var(--averageMargin) / 1.75);
		right: calc(var(--averageMargin) / 4 + 6px);
		height: 2em;
		width: 2.6em;
		margin: auto;

		color: #7fb785;

		font-size: 1em;
		display: flex;

		align-items: center;
		background-color: transparent;
		justify-content: center;

		border: none;
		outline: none;

		border-radius: calc(var(--borderRadius) / 1.2);

		transition: all 150ms ease-in-out;
	}
	.sendBtn:hover {
		background-color: var(--greyLight);
	}
	@media screen and (min-width: 1410px) {
		.sendBtn {
			bottom: calc(var(--averageMargin) / 1.7);
		}
	}

	::-webkit-scrollbar {
		width: 5px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 5px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #444;
		border-radius: 5px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}

	@media screen and (max-width: 768px) {
		#ta-frame {
			padding-right: 6px;
		}
	}
</style>
