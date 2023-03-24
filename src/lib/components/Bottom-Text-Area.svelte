<script lang="ts">
	import { user_message } from '$lib/stores/user_message'
	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { userName } from '$lib/stores/userName'
	import { userName_id } from '$lib/stores/userName_id'
	import { applyNavDataMessage } from '$lib/bigFunctions/applyTextMessage'

	import { autoresize } from 'svelte-textarea-autoresize'
	import sendButtonLogo from '$lib/assets/sendButton.svg'
	import { currentPage } from '$lib/stores/currentPage'
	import { timeSince } from '$lib/bigFunctions/timeFormat'
	// import { timeSince } from '$lib/timeFormat'

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
		if (message === '') {
			return
		} else {
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
	}
</script>

<div class="textAreeaBox">
	<button class="button" on:click={socketWorker} style="{$currentPage === 'PUBLIC' ? 'background-color:var(--secondary)' : ''}{$currentPage === 'HASHTAGS' ? 'background-color:var(--primary)' : ''}{$currentPage === 'LOCATIONS' ? 'background-color:var(--secOptDark)' : ''}{$currentPage === 'REPLIES' ? 'background-color:var(--secOptLight)' : ''}"><img class="sendButtonLogo" src={sendButtonLogo} alt="sendbutton" /></button>
	<textarea use:autoresize class="textArea" bind:value={$user_message} on:keydown={handleKeyDown} placeholder="Type your message..." />
</div>

<style>
	.sendButtonLogo {
		width: 20px;
		height: 20px;
		margin: 0;
		padding: 0;
	}
	.textAreeaBox {
		width: 100%;
		height: 60%;
		/* height: calc(max-content - 30px); */
		/* margin-top: 100px; */
		display: flex;
		justify-content: center;
		align-items: flex-end;

		position: relative;
		pointer-events: all;

		background-color: var(--primaryTheme);

		/* border: 1px solid var(--tertiaryTheme); */
		/* background-image: linear-gradient(rgba(0, 0, 0, 0), var(--primaryTheme)); */
	}

	::-webkit-scrollbar {
		display: none;
	}

	textarea {
		color: var(--primaryThemeInverted);
		font-family: ULight;
		/* box-shadow: var(--boxInsetShadows); */
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
	}

	.button {
		position: absolute;
		margin: 0;
		padding: 0.56rem;

		display: flex;
		justify-content: center;
		align-items: center;

		border-radius: calc(var(--borderRadius) / 1.69);
		box-shadow: var(--boxShadows);

		right: 0.4rem;
		bottom: 0.4rem;
		transition: box-shadow 0.2s ease-in-out;
		/* margin: 10px; */
	}
	.button:active {
		box-shadow: var(--boxInsetShadows);
	}
	.textArea {
		width: 100%;
		height: 100%;
		margin: 6px;
		margin-right: 3.4rem;
		padding: 8px;
		border: none;
		outline: none;
		resize: none;
		font-size: 1.2rem;
		border-radius: calc(var(--borderRadius) / 3);

		box-shadow: var(--boxInsetShadows);
		background-color: var(--secondaryTheme);

		max-height: 100px;
	}
</style>
