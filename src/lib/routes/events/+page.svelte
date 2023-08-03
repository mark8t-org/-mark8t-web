<script lang="ts">
	import { onMount } from 'svelte';
	import type Mark8tCore from '../../index';

	let Core: typeof Mark8tCore;
	export let data;
	onMount(() => {
		Core = data.props?.Core as typeof Mark8tCore;
	});
</script>

{#if Core}
	<Core.Pages.EventsAndHours />
{/if}
