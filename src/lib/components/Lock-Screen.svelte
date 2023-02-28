<script lang="ts">
	import { userName } from '$lib/stores/userName'
	import { isLocked } from '$lib/stores/isLocked'

	function unLock() {
		$isLocked = false
	}

	function handleLockKeyDown(event: any) {
		if (event.key === 'Escape') {
			$userName = ''
		}
		if (event.key === 'Enter' && $userName.length > 2) {
			unLock()
		}
	}
</script>

<div class="LockScreen">
	<div class="locContainers top"><h1 class="lockHeader"><span style="color:var(--secondary)">wassup</span> {$userName.length > 0 ? $userName + '!' : 'world'}</h1></div>
	<div class="locContainers middle">
		<input type="text" spellcheck="false" oninput="this.value=this.value.replace(/[^A-Za-z\s]/g,'');" onkeypress="return event.charCode != 32" maxlength="18" class="loginInput" on:keydown={handleLockKeyDown} bind:value={$userName} placeholder="world" />

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
		background-color: var(--primaryTheme);
		font-size: calc(var(--fontSize) * 2);
		padding: calc(var(--averageMargin) * 2) calc(var(--averageMargin) * 3);

		margin-bottom: var(--averageMargin);
		text-align: center;
	}
	.lockHeader {
		font-size: calc(var(--fontSize) * 3);
		padding: calc(var(--averageMargin) * 2) calc(var(--averageMargin) * 3);
		color: var(--primary);
		font-family: Imprima;
	}
	input {
		font-family: Imprima;
		scale: 2;
		color: var(--primary);
	}
	input::placeholder {
		color: var(--primaryThemeInverted);
		opacity: var(--extraDull);
		font-family: ULight;
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
