<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let { tracks } = data;

	let searchTerm = '';
	let timer: NodeJS.Timeout;

	const search = async (e: Event) => {
		clearTimeout(timer);
		timer = setTimeout(async () => {
			const t = e.target as HTMLInputElement;
			const searchTerm = t.value;
			const result = await fetch(`/api/searchTrack?searchTerm=${searchTerm}`);
			tracks = await result.json();
		}, 300);
	};
</script>

<h1>Tracks</h1>

<input
	type="search"
	placeholder="Search ..."
	value={searchTerm}
	on:input={search}
/>

<table>
	<thead>
		<tr><th>Track</th><th>Artist</th><th>Album</th><th>Genre</th></tr>
	</thead>
	<tbody>
		{#each tracks as { trackName, artistName, albumTitle, albumId, genre }}
			<tr>
				<td>{trackName}</td>
				<td>{artistName}</td>
				<td><a href={`/album/${albumId}`}>{albumTitle}</a></td>
				<td>{genre}</td>
			</tr>
		{/each}
	</tbody>
</table>
