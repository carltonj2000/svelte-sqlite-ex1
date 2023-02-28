<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { title, name } = data.album;

	function millisToMinutesAndSeconds(millis: number) {
		const minutes = Math.floor(millis / 60000);
		const seconds = ((millis % 60000) / 1000).toFixed(0);
		return minutes + ':' + (parseInt(seconds) < 10 ? '0' : '') + seconds;
	}
</script>

<div>
	<h3>{title}</h3>
	<p>by</p>
	<h5>{name}</h5>
</div>

<table>
	<thead>
		<tr><th>Track #</th><th>Name</th><th>Time</th></tr>
	</thead>
	<tbody>
		{#each data.tracks as { name, ms }, i}
			<tr>
				<td>{i + 1}</td>
				<td>{name}</td>
				<td>{millisToMinutesAndSeconds(ms)}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
</style>
