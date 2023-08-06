<script lang="ts">
	import { onMount } from 'svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	import type Mark8tCore from '@mark8t/core';

	export let data;

	let Core: typeof Mark8tCore;
	let Admin: typeof any;
	let Modules: typeof any;
	let Web: typeof any;
	let M: typeof any;
	let wrapInAdmin = false;
	function unsavedChanges() {
		return false;
	}

	// update string to upper case first letter
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// on route change run this
	const handleRouteChange = () => {
		let locationHasProducts = location.pathname.indexOf('products') > -1;
		let locationHasAdmin = location.pathname.indexOf('admin') > -1;

		let moduleName = capitalizeFirstLetter(
			location.pathname.split('/')[location.pathname.split('/').length - 1]
		);
		console.log('moduleName', locationHasAdmin, moduleName);

		if (
			!Object.hasOwnProperty.call(Web, moduleName) &&
			!Object.hasOwnProperty.call(Modules, moduleName)
		) {
			console.log('Loading Home', Web['Home']);
			moduleName = 'Home';
			M = Web['Home'];
			return;
		}

		if (locationHasAdmin) {
			if (moduleName === 'Admin') {
				wrapInAdmin = false;
				M = Web[moduleName];
				console.log(M);
			} else {
				wrapInAdmin = true;
				M = Modules[moduleName];
			}

			return;
		}

		if (locationHasProducts && !locationHasAdmin) moduleName = 'ProductsSlug';
		if (Object.hasOwnProperty.call(Web, moduleName)) return (M = Web[moduleName]);

		console.log('module', M);
	};

	//
	beforeNavigate(() => {});

	//
	afterNavigate(() => {
		// M = null;
		handleRouteChange();
	});

	//
	onMount(() => {
		Core = data.props?.Core as typeof Mark8tCore;
		Admin = data.props?.Admin as typeof any;
		Modules = data.props?.Modules as typeof any;
		Web = data.props?.Web as typeof any;
		handleRouteChange();

		// console.log('Modules', Web);
		// console.log('Modules', location.pathname.replace('/admin/', ''));
	});
</script>

{#if Core}
	{#if Web}
		{#if Admin && wrapInAdmin}
			<svelte:component this={Admin} override={true}>
				{#if M}
					<svelte:component this={M} {data} {unsavedChanges} overrideOpenState={true} />
					<!-- <M {data} {unsavedChanges} overrideOpenState={true} /> -->
				{/if}
			</svelte:component>
		{/if}
		{#if M && !wrapInAdmin}
			<svelte:component this={M} {data} {unsavedChanges} overrideOpenState={true} />
			<!-- <M {data} {unsavedChanges} overrideOpenState={true} /> -->
		{/if}
	{/if}
{/if}
