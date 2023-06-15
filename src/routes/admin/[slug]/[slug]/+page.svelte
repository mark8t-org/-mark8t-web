<script lang="ts">
	import { onMount } from 'svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	import type Mark8tCore from '@mark8t/core';

	let Core: typeof Mark8tCore;
	let Admin: typeof any;
	let Modules: typeof any;
	let M: typeof any;
	export let data;
	function unsavedChanges() {
		return false;
	}

	// update string to upper case first letter
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// on route change run this
	const handleRouteChange = () => {
		const moduleName = location.pathname.split('/')[location.pathname.split('/').length - 1];
		console.log('moduleName', moduleName);

		M = Modules[capitalizeFirstLetter(moduleName)];
	};

	beforeNavigate(() => {
		M = null;
	});
	afterNavigate(() => {
		handleRouteChange();
	});
	onMount(() => {
		Core = data.props?.Core as typeof Mark8tCore;
		Admin = data.props?.Admin as typeof any;
		Modules = data.props?.Modules as typeof any;

		handleRouteChange();
		console.log('Modules', Modules);
		// console.log('Modules', location.pathname.replace('/admin/', ''));
	});
</script>

{#if Core}
	{#if Admin}
		{#if Modules}
			<Admin override={true}>
				{#if M}
					<M {unsavedChanges} overrideOpenState={true} />
				{/if}
			</Admin>
		{/if}
	{/if}
{/if}
