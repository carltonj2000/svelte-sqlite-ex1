<script lang="ts">
	import '@picocss/pico';
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;
</script>

<main class="container">
	<nav>
		<ul>
			<li><strong><a href="/">Music</a></strong></li>
		</ul>
		<ul>
			<li><a href="/">Home</a></li>
			{#if data?.username}
				<li>
					<a
						href="/logout"
						data-sveltekit-preload-data="off"
						data-sveltekit-reload>Hello {data.username}, Log Out</a
					>
				</li>
			{:else}
				<li><a href="/login">Log In</a></li>
			{/if}
		</ul>
	</nav>
	<slot />
</main>
