<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Tracks</h1>

<table>
	<thead>
		<tr><th>Track</th><th>Artist</th><th>Album</th><th>Genre</th></tr>
	</thead>
	<tbody>
		{#each data.tracks as { trackName, artistName, albumTitle, albumId, genre }}
			<tr>
				<td>{trackName}</td>
				<td>{artistName}</td>
				<td><a href={`/album/${albumId}`}>{albumTitle}</a></td>
				<td>{genre}</td>
			</tr>
		{/each}
	</tbody>
</table>
