<script lang="ts">
	import { user_message } from '$lib/stores/user_message'
	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { userName } from '$lib/stores/userName'
	import { userName_id } from '$lib/stores/userName_id'

	import { autoresize } from 'svelte-textarea-autoresize'
	import sendButtonLogo from '$lib/assets/sendButton.svg'
	import { currentPage } from '$lib/stores/currentPage'

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault()
			socketWorker()
			$user_message = ''
		}
	}
	const socketWorker = async () => {
		console.log('socketWorker')
		const message = $user_message.slice(0, 999).trim()
		$user_message = ''

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
			body: JSON.stringify({ message, $userGroup_id, $userName, $userName_id }),
		})

		const response = await res.json()
		console.log(response)
		if (!res.ok) {
			alert(response.message)
		}
	}
</script>

<div class="textAreeaBox">
	<button class="button" on:click={socketWorker} style="{$currentPage === 'PUB' ? 'background-color:var(--secondary)' : ''}{$currentPage === 'HASH' ? 'background-color:var(--primary)' : ''}{$currentPage === 'LOC' ? 'background-color:var(--secOptDark)' : ''}"><img class="sendButtonLogo" src={sendButtonLogo} alt="sendbutton" /></button>
	<textarea use:autoresize class="textArea" bind:value={$user_message} on:keydown={handleKeyDown} placeholder="Type something long into me.." />
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
		height: fit-content;
		display: flex;
		justify-content: center;
		align-items: flex-end;

		position: relative;

		background-color: var(--secondaryTheme);

		/* border: 1px solid var(--tertiaryTheme); */
		box-shadow: var(--boxShadows);
	}
	::-webkit-scrollbar {
		display: none;
	}

	textarea {
		color: var(--secondaryThemeInverted);
	}
	textarea::placeholder {
		color: var(--tertiaryThemeInverted);
		opacity: var(--extraDull);
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

		/* background-color: var(--secondaryTheme); */
		border-radius: 6px;
		box-shadow: var(--boxShadows);

		right: 0.4rem;
		bottom: 0.4rem;
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

		background-color: var(--primaryTheme);
		box-shadow: var(--boxInsetShadows), var(--boxShadows);

		max-height: 100px;
	}
</style>
