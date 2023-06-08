<script lang="ts">
	import { onMount } from 'svelte';
	import type Mark8tCore from '../../index';

	let Core: typeof Mark8tCore;
	let Admin: typeof any;
	let Modules: typeof any;
	let M: typeof any;
	export let data;
	function unsavedChanges() {
		return false;
	}
	onMount(() => {
		Core = data.props?.Core as typeof Mark8tCore;
		Admin = data.props?.Admin as typeof any;
		Modules = data.props?.Modules as typeof any;
	});
</script>

{#if Core}
	{#if Admin}
		{#if Modules}
			<Admin override={true}>
				<Modules.Products {unsavedChanges} overrideOpenState={true} />
			</Admin>
		{/if}
	{/if}
{/if}
