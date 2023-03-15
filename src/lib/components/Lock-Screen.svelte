<script lang="ts">
	import { userName } from '$lib/stores/userName'
	import { loginResponseData } from '$lib/stores/loginResponseData'
	import { isLocked } from '$lib/stores/isLocked'
	import { onMount } from 'svelte'
	import { json } from '@sveltejs/kit'
	import { userName_id } from '$lib/stores/userName_id'
	import { isPUBLICgroupData } from '$lib/stores/isPUBLICgroupData'
	import { isPUBLIC } from '$lib/stores/isPUBLIC'
	import { userGroup_id } from '$lib/stores/userGroup_id'
	import { canSend } from '$lib/stores/canSend'
	import { canSendReciever } from '$lib/stores/canSendReciever'
	import { toggleTheme } from '$lib/stores/toggleTheme'
	$: if ($userName) $userName = $userName.toLowerCase()

	import { pusher } from '$lib/pusher'
	import Pusher from 'pusher-js'
	import { currentPage } from '$lib/stores/currentPage'
	import { isFlex } from '$lib/stores/isFlex'

	// const toggleThemeButton = () => {
	// 	if ($toggleTheme === 'dark') {
	// 		console.log('dark')
	// 		$toggleTheme = 'light'
	// 	} else {
	// 		$toggleTheme = 'dark'
	// 		console.log('light')
	// 	}
	// }

	onMount(() => {
		const savedDataString = localStorage.getItem('formData')
		const button = document.getElementById('submit')
		if (savedDataString) {
			try {
				// Parse the saved data from local storage
				const { $userName: savedUserName } = JSON.parse(savedDataString)
				if (savedUserName != '') {
					// button?.click()
					$userName = savedUserName
					unLock()
				}
			} catch (err) {
				// Handle any errors that occurred while parsing the saved data
				console.error(err)
			}
		}

		// const themeToggle = document.getElementById('theme-toggle')
		// const root = document.documentElement
		// themeToggle?.addEventListener('click', () => {
		// 	if (root.style.getPropertyValue('--primaryTheme') === '#1f1f1f') {
		// 		$toggleTheme = 'light'
		// 		// Switch to light mode
		// 		root.style.setProperty('--primaryTheme', '#fff')
		// 		root.style.setProperty('--secondaryTheme', '#eee')
		// 		root.style.setProperty('--tertiaryTheme', '#eee5')

		// 		root.style.setProperty('--boxShadows', '0px 0px 8px #1119, 0px 0px 1px #111')
		// 		root.style.setProperty('--boxShadowsBlur', '0px 0px 25px #1119, 0px 0px 8px #1118')
		// 		root.style.setProperty('--boxInsetShadows', 'inset 0px 0px 6px #0004, inset 0px 0px 1px #111')

		// 		root.style.setProperty('--primaryThemeInverted', '#1f1f1f')
		// 		root.style.setProperty('--secondaryThemeInverted', '#2a2a2a')
		// 		root.style.setProperty('--tertiaryThemeInverted', '#3a3a3a55')

		// 		root.style.setProperty('--boxShadowsInverted', '0px 0px 8px #1119, 0px 0px 1px #111')
		// 		root.style.setProperty('--boxShadowsBlurInverted', '0px 0px 25px #1119, 0px 0px 8px #1118')
		// 		root.style.setProperty('--boxInsetShadowsInverted', 'inset 0px 0px 6px #0004, inset 0px 0px 1px #111')

		// 		root.style.setProperty('--boxNeoShadows', ' 1px 1px 2px #adadad, -1px -1px 2px #e0e0e0')
		// 	} else {
		// 		$toggleTheme = 'dark'
		// 		// Switch to dark mode
		// 		root.style.setProperty('--primaryTheme', '#1f1f1f')
		// 		root.style.setProperty('--secondaryTheme', '#2a2a2a')
		// 		root.style.setProperty('--tertiaryTheme', '#3a3a3a55')

		// 		root.style.setProperty('--boxShadows', '0px 0px 8px #1119, 0px 0px 1px #111')
		// 		root.style.setProperty('--boxShadowsBlur', '0px 0px 25px #1119, 0px 0px 8px #1118')
		// 		root.style.setProperty('--boxInsetShadows', 'inset 0px 0px 6px #0004, inset 0px 0px 1px #111')

		// 		root.style.setProperty('--primaryThemeInverted', '#fff')
		// 		root.style.setProperty('--secondaryThemeInverted', '#eee')
		// 		root.style.setProperty('--tertiaryThemeInverted', '#eee5')

		// 		root.style.setProperty('--boxShadowsInverted', '0px 0px 8px #1119, 0px 0px 1px #111')
		// 		root.style.setProperty('--boxShadowsBlurInverted', '0px 0px 25px #1119, 0px 0px 8px #1118')
		// 		root.style.setProperty('--boxInsetShadowsInverted', 'inset 0px 0px 6px #0004, inset 0px 0px 1px #111')

		// 		root.style.setProperty('--boxNeoShadows', '1px 1px 2px #111111, -1px -1px 2px #414141')
		// 	}
		// })
	})

	export async function unLock() {
		localStorage.setItem('formData', JSON.stringify({ $userName }))
		$isLocked = false

		if ($userName != '') {
			const res = await fetch('/api/logInData', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ data: $userName }),
			})
			const response = await res.json()
			if (res.ok) {
				$loginResponseData = response
				$userName_id = response.userName_id
				pusher.subscribe($userName_id).bind('inserted', (data: any) => {
					console.log(data.message)
				})
				// if ($isFlex === false) {
				// setTimeout(() => {
				// 	$isPUBLICgroupData.allUsers.forEach((user: any) => {
				// 		console.log('user._id', user._id)
				// 		console.log('$userName_id', response.userName_id)
				// 		if (user._id === response.userName_id) {
				// 			$canSend = true
				// 			console.log('$canSend', $canSend)
				// 			$currentPage = 'PUB'
				// 		} else {
				// 			$canSendReciever = user._id
				// 		}
				// 	})
				// }, 2000)
				// }
				// console.log($userName_id)

				$loginResponseData.data.formatedHASHTAGSdata.forEach((element: any) => {
					console.log(element._id)
					if ($userGroup_id != element._id) {
						pusher.subscribe(element._id).bind('inserted_Put', (data: any) => {
							console.log(data.message)
							console.log(data)
						})
					}
				})
				$loginResponseData.data.formatedLOCdata.forEach((element: any) => {
					console.log(element._id)
					if ($userGroup_id != element._id) {
						pusher.subscribe(element._id).bind('inserted_Put', (data: any) => {
							console.log(data.message)
							console.log(data)
						})
					}
				})

				$loginResponseData.data.formatedPUBLICdata.forEach((element: any) => {
					console.log(element._id)
					if ($userGroup_id != element._id) {
						pusher.subscribe(element._id).bind('inserted_Put', (data: any) => {
							console.log(data.message)
							console.log(data)
						})
					}
				})
			} else if (!res.ok) {
				alert(response.message)
				// $canSend = false
			}
		}
	}
	function handleKeyUp(event: any) {
		$userName = $userName.toLowerCase().replace(/\s/g, '')
	}

	function handleLockKeyDown(event: any) {
		if (event.key === 'Escape') {
			$userName = ''
		}
		if (event.key === 'Enter' && $userName.length > 2 && $userName.length < 19 && $userName.toString().trim() != '' && $userName != ' ') {
			unLock()
		}
	}
</script>

<div class="LockScreen">
	<div class="locContainers top">
		<h1 class="lockHeader">
			<span style="color:var(--secondary)">wassup</span>
			<span style={$userName.length > 0 ? $userName + '' : 'opacity:var(--dull)'}>{$userName.length > 0 ? $userName + '!' : 'world!'}</span>
		</h1>
	</div>
	<div class="locContainers middle">
		<input type="text" spellcheck="false" oninput="this.value=this.value.replace(/[^A-Za-z\s]/g,'');" onkeypress="return event.charCode != 32" maxlength="18" class="loginInput" on:keydown={handleLockKeyDown} on:keyup={handleKeyUp} bind:value={$userName} placeholder="write-your-name..." />

		{#if $userName.length < 3}
			<button disabled class="fa fa-arrow-right arrow disabled" />
		{:else}
			<button class="fa fa-arrow-right arrow enabled" on:click={unLock} id="submit" />
		{/if}
	</div>
	<div class="locContainers bottom">
		<!-- <button id="theme-toggle" on:click={toggleThemeButton}><span class="fa fa-adjust" /></button> -->
	</div>
</div>

<style>
	/* #theme-toggle {
		background-color: transparent;
		border: none;
		color: var(--secondary);
		width: max-content;
		font-size: 1.5rem;
		padding: 1rem;

		border-radius: var(--borderRadius);
		transition: box-shadow 200ms ease-in-out;
	}
	#theme-toggle:hover {
		cursor: pointer;
		box-shadow: var(--boxNeoShadows);
	} */
	.arrow {
		background-color: transparent;
		margin-top: calc(var(--averageMargin) * 2);
		scale: 2;
		width: auto;
		height: auto;
		border-radius: calc(var(--borderRadius) / 1.25);

		transition: all 200ms ease-in-out;
	}
	.disabled {
		animation: loginOut 300ms both;

		color: var(--primaryTheme);
		box-shadow: none;

		pointer-events: none;
	}
	@keyframes loginOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	.enabled {
		animation: loginUp 300ms both;

		color: var(--primary);
		box-shadow: var(--boxNeoShadows);
	}
	@keyframes loginUp {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	.loginInput {
		width: 400px;
		height: auto;
		border: none;
		background-color: transparent;
		font-size: calc(var(--fontSize) * 2);
		padding: calc(var(--averageMargin) * 2) calc(var(--averageMargin) * 3);

		margin-bottom: var(--averageMargin);
		text-align: center;
	}
	.lockHeader {
		font-size: calc(var(--fontSize) * 2);
		padding: calc(var(--averageMargin) * 2) calc(var(--averageMargin) * 3);
		color: var(--primary);
		font-family: Imprima;
	}
	input {
		font-family: Imprima;
		scale: 2;
		color: var(--primary);
		/* lowercase font */
		text-transform: lowercase;
	}
	input::placeholder {
		color: var(--primaryThemeInverted);
		opacity: var(--extraDull);
		font-family: ULight;
		scale: 0.5;
	}
	.LockScreen {
		height: 100%;
		width: 100%;
		background-color: var(--primaryTheme);
		border-radius: var(--borderRadius);

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	.top {
		height: 200px;
		width: 100%;
		border-top-left-radius: var(--borderRadius);
		border-top-right-radius: var(--borderRadius);

		display: flex;
		align-items: flex-end;
		justify-content: center;
	}
	.middle {
		height: auto;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	.bottom {
		height: 200px;
		width: 100%;
		border-bottom-left-radius: var(--borderRadius);
		border-bottom-right-radius: var(--borderRadius);

		display: flex;
		align-items: flex-start;
		justify-content: center;
	}
</style>
