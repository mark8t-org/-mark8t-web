<script lang="ts">
	import { onMount } from 'svelte';
	import type Mark8tCore from '../../index';

	let Core: typeof Mark8tCore;

	export let data;
	onMount(async () => {
		Core = (await data.props?.Core) as typeof Mark8tCore;
	});
</script>

{#if Core}
	<Core.Pages.Retail
		first={true}
		label="what is"
		title="On Tap"
		price={false}
		includeByTags={['on tap']}
		displayCount={4}
		displayTotal={8}
		bannerLink="/retail"
		bannerTitle="ORDER NOW!"
		bannerSubtitle="Reserve beer for pickup! Cans of beer are available any time we are open!"
		bannerExtra="*we accept visa, mastercard, debit, and"
	/>
{/if}
