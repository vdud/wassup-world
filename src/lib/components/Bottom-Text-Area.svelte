<script lang="ts">
	import { user_message } from '$lib/stores/user_message'
	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { userName } from '$lib/stores/userName'
	import { userName_id } from '$lib/stores/userName_id'
	import { applyNavDataMessage, applyNewMessageFresh, freshReplyMessage } from '$lib/bigFunctions/applyTextMessage'

	import { autoresize } from 'svelte-textarea-autoresize'
	import sendButtonLogo from '$lib/assets/sendBtn.png'
	import { currentPage } from '$lib/stores/currentPage'
	import { messageId } from '$lib/stores/messageId'

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault()
			socketWorker()
			$user_message = ''
		}
	}

	const socketWorker = async () => {
		const message = $user_message.slice(0, 999)
		const groupId = $userGroup_id
		$user_message = ''

		if ($currentPage !== 'REPLIES') {
			if (message === '') {
				return
			} else {
				applyNewMessageFresh({ sender: $userName, message, groupId, createdAt: new Date() })
				applyNavDataMessage({ sender: $userName, message, createdAt: new Date(), groupId, nature: $currentPage })

				const res = await fetch('/api/textAreaMessages', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},

					body: JSON.stringify({ message, $userGroup_id, $userName, $userName_id }),
				})

				const response = await res.json()
				if (!res.ok) {
					alert(response.message)
				}
			}
		} else if ($currentPage === 'REPLIES') {
			if (message === '' && $messageId !== '') {
				return
			} else {
				freshReplyMessage({ sender: $userName, message, createdAt: new Date() })
				const res = await fetch('/api/replyMessages', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ message, $userGroup_id, $userName, $userName_id, $messageId }),
				})
				const response = await res.json()

				if (!res.ok) {
					alert(response.message)
				}

				const replyBody = document.getElementById('middleScroll')
				if (replyBody) {
					setTimeout(() => {
						replyBody.scrollTop = replyBody.scrollHeight
					}, 100)
				}
			}
		}
	}
</script>

<div class="textAreeaBox">
	<button class="button" on:click={socketWorker} style="{$currentPage === 'PUBLIC' ? 'background-color:var(--secondary)' : ''}{$currentPage === 'HASHTAGS' ? 'background-color:var(--primary)' : ''}{$currentPage === 'LOCATIONS' ? 'background-color:var(--secOptDark)' : ''}{$currentPage === 'REPLIES' ? 'background-color:var(--secOptLight)' : ''}"><img class="sendButtonLogo" src={sendButtonLogo} alt="sendbutton" /></button>
	<textarea use:autoresize id="textAreaId" class="textArea" bind:value={$user_message} on:keydown={handleKeyDown} placeholder="Type your message..." />
</div>

<style>
	.sendButtonLogo {
		width: var(--buttonHW);
		height: var(--buttonHW);
		margin: 0;
		padding: 0;
		scale: 3;
	}
	.textAreeaBox {
		width: 100%;
		height: 80%;
		display: flex;
		justify-content: center;
		align-items: flex-end;

		position: relative;
		pointer-events: all;

		background-color: var(--secondaryTheme);
	}

	::-webkit-scrollbar {
		display: none;
	}
	.textArea {
		background-color: var(--red);
	}

	textarea {
		color: var(--primaryThemeInverted);
		font-family: ULight;
	}
	textarea::placeholder {
		color: var(--disabled);
		opacity: var(--extraDull);
		font-family: UBold;
	}
	button {
		border: none;
		outline: none;
		background-color: transparent;
		width: auto;
		margin: 0;
		overflow: hidden;
	}

	.button {
		position: absolute;
		margin: 0;
		padding: 0.56rem;

		display: flex;
		justify-content: center;
		align-items: center;

		/* border-radius: calc(var(--borderRadius) / 1.69); */
		box-shadow: var(--boxShadows);

		right: 0.4rem;
		bottom: 0.4rem;
		transition: box-shadow 0.2s ease-in-out;
	}
	.button:active {
		box-shadow: var(--boxInsetShadows);
	}
	.textArea {
		width: 100%;
		height: 100%;
		margin: 6px;
		height: 100%;
		margin-right: calc(var(--buttonHW) + 30px);
		padding: 14px;
		border: none;
		outline: none;
		resize: none;
		font-size: 1.2rem;
		border-radius: var(--borderRadius);

		box-shadow: var(--boxInsetShadows);
		background-color: var(--primaryTheme);

		max-height: 100px;
	}
</style>
