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
	<div id="effects_target">
		<Core.Components.Web.Store.ProductsWithFilter
			label="what is in"
			title="retail"
			includeByTag="in stock"
			price={true}
		/>
		<Core.Components.Web.Store.ProductsWithFilter
			label="what you can wear"
			title="merch"
			includeByTag="merch"
			price={true}
		/>
	</div>

	<Core.Components.Google.Calendar />
	<Core.Components.Google.Map />
	<Core.Components.Web.Newsletter />
{/if}
