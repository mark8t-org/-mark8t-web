<script lang="ts">
	import { onMount } from 'svelte';
	// import type Mark8tCore from '../../node_modules/-mark8t-core/src/lib/index.ts';

	let Core: typeof any;

	export let data;
	onMount(() => {
		Core = data.props?.Core as typeof any;
	});
</script>

{#if Core}
	<Core.Pages.Home />
{/if}
