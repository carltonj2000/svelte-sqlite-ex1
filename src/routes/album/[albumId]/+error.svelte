<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>Something bad is a foot here</h1>
<p>{$page.status}: {$page?.error?.message}</p>
