<script lang="ts">
	import { user_message } from '$lib/stores/user_message';
	import { userGroup_id } from '$lib/stores/userGroup_id';
	import { userName } from '$lib/stores/userName';
	import { userName_id } from '$lib/stores/userName_id';
	import { invader } from '$lib/stores/invader';

	import { applyMessage, applyNavDataMessage, applyNewMessageFresh, freshReplyMessage } from '$lib/bigFunctions/applyTextMessage';
	import { autoresize } from 'svelte-textarea-autoresize';
	import sendButtonLogo from '$lib/assets/sendBtn.png';
	import { currentPage } from '$lib/stores/currentPage';
	import { messageId } from '$lib/stores/messageId';
	import { debounce } from '$lib/bigFunctions/debounce';

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			socketWorker();
			$user_message = '';
		}
	}

	const pingTyping = async () => {
		if ($user_message === '') {
			return;
		}
		const res = await fetch('/api/typing', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ $userGroup_id, $userName }),
		});
	};
	const debouncedPingTyping = debounce(pingTyping, 330);
	function handleKeyUp(event: KeyboardEvent) {
		debouncedPingTyping();
	}

	const socketWorker = async () => {
		const message = $user_message.slice(0, 999);
		const groupId = $userGroup_id;
		$user_message = '';
		const time = new Date();
		$invader = true;

		const middleScroll: any = document.getElementById('middleScroll');
		if (middleScroll) {
			setTimeout(() => {
				middleScroll.scrollTo({ top: middleScroll.scrollHeight, behavior: 'smooth' });
			}, 100);
		}

		if ($currentPage === 'REPLIES') {
			if (message === '' && $messageId !== '') {
				return;
			} else {
				freshReplyMessage({ sender: $userName, message, createdAt: time });
				const res = await fetch('/api/replyMessages', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ message, $userGroup_id, $userName, $userName_id, $messageId }),
				});
				const response = await res.json();

				if (!res.ok) {
					alert(response.message);
				}
			}
		} else {
			if (message === '') {
				return;
			} else {
				applyNewMessageFresh({ sender: $userName, message, groupId, createdAt: time, isYoMe: true });
				applyNavDataMessage({ sender: $userName, message, createdAt: time, groupId, nature: $currentPage });

				const res = await fetch('/api/textAreaMessages', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},

					body: JSON.stringify({ message, $userGroup_id, $userName, $userName_id }),
				});

				const response = await res.json();
				applyMessage({ sender: $userName, message: message, createdAt: time, messageId: response.messageId, $userName_id, $userGroup_id, isYoMe: true });
				if (!res.ok) {
					alert(response.message);
				}
			}
		}
	};
</script>

<div class="textAreeaBox">
	<button class="button" on:click={socketWorker} style="{$currentPage === 'PUBLIC' ? 'background-color:var(--secondary)' : ''}{$currentPage === 'HASHTAGS' ? 'background-color:var(--primary)' : ''}{$currentPage === 'LOCATIONS' ? 'background-color:var(--secOptDark)' : ''}{$currentPage === 'REPLIES' ? 'background-color:var(--secOptLight)' : ''}"><img class="sendButtonLogo" src={sendButtonLogo} alt="sendbutton" /></button>
	<textarea use:autoresize id="textAreaId" class="textArea" bind:value={$user_message} on:keydown={handleKeyDown} on:keyup={handleKeyUp} placeholder="Type your message..." />
</div>

<style>
	.sendButtonLogo {
		width: var(--buttonHW);
		height: var(--buttonHW);
		margin: 0;
		padding: 0;
		scale: 4;
	}
	.textAreeaBox {
		width: 100%;
		height: 80%;
		display: flex;
		justify-content: start;
		align-items: flex-end;

		position: relative;
		pointer-events: all;

		background-color: var(--secondaryTheme);
	}

	::-webkit-scrollbar {
		display: none;
	}
	textarea {
		color: var(--primaryThemeInverted);
		font-family: ULight;
		box-shadow: var(--boxShadows), var(--boxInsetShadows);
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
		padding: 01rem;
		scale: 1.55;

		width: var(--buttonHW);
		height: var(--buttonHW);

		display: flex;
		justify-content: center;
		align-items: center;

		border-radius: calc(var(--borderRadius) / 1.55);
		box-shadow: var(--boxShadows), var(--boxInsetShadows);

		right: 01rem;
		bottom: 01rem;
		transition: box-shadow 0.2s ease-in-out;
	}
	.button:active {
		box-shadow: var(--boxInsetShadows);
	}
	.textArea {
		width: calc(100% - var(--buttonHW) - 5.3rem);
		height: 100%;
		margin: 6px;
		height: 100%;
		/* margin-right: calc(var(--buttonHW) + 30px); */
		padding: 14px;
		border: none;
		outline: none;
		resize: none;
		font-size: 1.2rem;
		border-radius: var(--borderRadius);

		background-color: var(--primaryTheme);

		max-height: 100px;
	}
</style>
