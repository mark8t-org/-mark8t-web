<script>
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	onMount(() => {
		// window.location = "/";
	});
</script>

<h1>{$page.status}: {$page.error.message}: redirecting . . .</h1>
