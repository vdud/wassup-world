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

	import { pusher } from '$lib/bigFunctions/pusher'
	import Pusher from 'pusher-js'
	import { currentPage } from '$lib/stores/currentPage'
	import { isFlex } from '$lib/stores/isFlex'
	import { isDarkMode } from '$lib/stores/isDarkMode'
	import { applyNavDataMessage, applyNewMessage } from '$lib/bigFunctions/applyTextMessage'
	import { nature } from '$lib/stores/nature'
	import { unLockBby } from '$lib/bigFunctions/unLockBby'

	$: if ($userName) $userName = $userName.toLowerCase().trim()
	const toggleThemeButton = () => {
		$isDarkMode = !$isDarkMode
	}

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
					// unLock({ $userName, $userName_id, $isLocked, $loginResponseData, $userGroup_id })
					unLock()
				}
			} catch (err) {
				// Handle any errors that occurred while parsing the saved data
				console.error(err)
			}
		}
	})

	const unLock = async () => {
		// unLockBby({ $userName, $userName_id, $loginResponseData, $userGroup_id })
		$isLocked = false
		if ($userName.length < 3 || $userName.length > 18 || $userName.toString().trim() == '' || $userName == ' ') {
			// alert('username must be atleast 3 characters long')
			return
		}
		localStorage.setItem('formData', JSON.stringify({ $userName }))
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
				pusher.subscribe($userName_id).bind('newPubMessage', (data: any) => {
					applyNewMessage({ groupName: data.groupName, sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: 'PUBLIC' })
					// console.log('triggered')
				})
				$loginResponseData.data.formatedHASHTAGSdata.forEach((element: any) => {
					if ($userGroup_id != element._id) {
						pusher.subscribe(element._id).bind('injectMessage', (data: any) => {
							applyNavDataMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: 'HASHTAGS' })
						})
					}
				})
				$loginResponseData.data.formatedLOCdata.forEach((element: any) => {
					if ($userGroup_id != element._id) {
						pusher.subscribe(element._id).bind('injectMessage', (data: any) => {
							applyNavDataMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: 'LOCATIONS' })
						})
					}
				})
				$loginResponseData.data.formatedPUBLICdata.forEach((element: any) => {
					if ($userGroup_id != element._id) {
						pusher.subscribe(element._id).bind('injectMessage', (data: any) => {
							applyNavDataMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: 'PUBLIC' })
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
			// unLock({ $userName, $userName_id, $isLocked, $loginResponseData, $userGroup_id })
		}
	}
</script>

<div class="LockScreen">
	<div class="locContainers top">
		<h1 class="lockHeader" style={$userName.length > 7 ? 'scale:.9;' : 'scale1;'}>
			<span style="color:var(--secondary)">wassup</span>
			<span style={$userName.length > 0 ? $userName + '' : 'opacity:var(--dull)'}>{$userName.length > 0 ? $userName + '!' : 'world!'}</span>
		</h1>
	</div>
	<div class="locContainers middle">
		<input type="text" spellcheck="false" style={$userName.length > 7 ? 'scale:1;' : 'scale:2;'} oninput="this.value=this.value.replace(/[^A-Za-z\s]/g,'');" onkeypress="return event.charCode != 32" maxlength="18" class="loginInput" on:keydown={handleLockKeyDown} on:keyup={handleKeyUp} bind:value={$userName} placeholder="write-your-name..." />

		<!-- {#if $userName.length < 3}
			<button disabled class="fa fa-arrow-right arrow disabled" />
		{:else} -->
		<button class="fa fa-arrow-right arrow {$userName.length < 3 ? 'disabled' : 'enabled'}" on:click={unLock} id="submit" />
		<!-- {/if} -->
	</div>
	<div class="locContainers bottom">
		<!-- <button id="theme-toggle" on:click={toggleThemeButton}><span class="fa fa-adjust" /></button> -->
	</div>
</div>

<style>
	input {
		font-family: Imprima;
		scale: 1;
		color: var(--primary);
		/* lowercase font */
		text-transform: lowercase;

		transition: scale 200ms ease-in-out;
	}
	input::placeholder {
		color: var(--primaryThemeInverted);
		opacity: var(--extraDull);
		font-family: ULight;
		scale: 0.5;
	}
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
		color: var(--tertiaryTheme);
		box-shadow: var(--boxInsetShadows);
		background-color: var(--primaryTheme);

		pointer-events: none;
	}
	.enabled {
		color: var(--primary);
		box-shadow: var(--boxShadows);
		background-color: var(--tertiaryTheme);
		text-shadow: var(--textShadows);
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
		font-size: calc(var(--fontSize) * 1.5);
		padding: calc(var(--averageMargin) * 2) calc(var(--averageMargin) * 3);
		color: var(--primary);
		font-family: Imprima;
		transition: scale 200ms ease-in-out;
	}
	.LockScreen {
		height: 100%;
		width: 100%;
		background-color: var(--secondaryTheme);
		border-radius: var(--borderRadius);

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;

		/* overflow: hidden; */
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
