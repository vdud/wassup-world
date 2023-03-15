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
	$: if ($userName) $userName = $userName.toLowerCase()

	import { pusher } from '$lib/pusher'
	import Pusher from 'pusher-js'
	import { currentPage } from '$lib/stores/currentPage'
	import { isFlex } from '$lib/stores/isFlex'

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
				console.log($userName_id)

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
	<div class="locContainers bottom" />
</div>

<style>
	.arrow {
		background-color: transparent;
		margin-top: calc(var(--averageMargin) * 2);
		scale: 2;
		width: auto;
		height: auto;
		border-radius: calc(var(--borderRadius) / 1.25);
	}
	.disabled {
		animation: loginOut 200ms both;
	}
	@keyframes loginOut {
		0% {
			color: #cd7b41;
			box-shadow: 2px 2px 3px #111111, -2px -2px 3px #414141;
		}
		100% {
			color: #1f1f1f;
			box-shadow: none;
		}
	}
	.enabled {
		animation: loginUp 300ms both;
	}
	@keyframes loginUp {
		0% {
			color: #1f1f1f;
		}
		100% {
			box-shadow: 2px 2px 3px #111111, -2px -2px 3px #414141;
			color: #cd7b41;
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
		height: 325px;
		width: 100%;
		/* border-top-left-radius: var(--borderRadius);
		border-top-right-radius: var(--borderRadius); */

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
	}
</style>
