<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form method="post">
	<input type="text" name="username" placeholder="User Name" required />
	<input type="password" name="password" placeholder="Password" />
	<!-- <input type="password" name="password" placeholder="Password" required /> -->
	{#if form?.errorMessage}
		<div class="error">{form.errorMessage}</div>
	{/if}
	<div>
		<button type="submit" formaction="?/register">Register</button>
		<button type="submit" formaction="?/login">Login</button>
	</div>
</form>

<style>
	div {
		display: flex;
		gap: 2rem;
	}
	.error {
		color: red;
	}
</style>
