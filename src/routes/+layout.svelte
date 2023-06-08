<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	import { page } from '$app/stores';
	import { base } from '$app/paths';

	import { getObject } from '../../node_modules/-mark8t-core/src/lib/utils/storage';
	import type CoreModule from '../../node_modules/-mark8t-core/src/lib/index';
	import { NavigationStore } from '../../node_modules/-mark8t-core/src/lib/stores/navigation';
	import { browser } from '$app/environment';
	// import Checkout from "./checkout_test/+page.svelte";

	import type { Tenant } from '../../node_modules/-mark8t-core/src/lib/utils/types';
	import Spinner from '../../node_modules/-mark8t-core/src/lib/components/Spinner.svelte';

	/** @type {import('./$types').LayoutData} */
	export let data;
	export let error = false;

	let image = import.meta.env.VITE_SEO_IMAGE;

	let Core: typeof CoreModule | null;
	let tenant: Tenant | null;
	$: pageName = $page.route.id;

	let isLoading = true;

	//...
	function containsRoute(route: string) {
		return $page?.url?.pathname.indexOf(route) > -1;
	}

	//...
	function isRoute(route: string) {
		console.log($page?.url.pathname, route);
		return $page?.url.pathname === route;
	}

	//...
	function originIsNotIframe() {
		return true; //window.location.origin === window.parent.location.origin;
	}

	//...
	function isCheckout() {
		return $page?.url.pathname.indexOf('checkout') > -1;
	}

	//...
	function inIframe() {
		try {
			return window.self !== window.top;
		} catch (e) {
			return true;
		}
	}

	//...
	onDestroy(() => console.log('+layout.svelte :: unmounted :: ' + pageName));

	beforeNavigate(() => {
		$NavigationStore = 'loading';
	});

	afterNavigate(() => {
		$NavigationStore = 'loaded';
	});

	//...
	onMount(async () => {
		Core = data.props?.Core || null;
		tenant = data.props?.Tenant || null;
		console.log(data);
		if (Core && Core.Services && Core.Services.Auth)
			if (Core.Services.Auth.getAccountTimeToLive()) {
				Core.Services.Auth.getPermissions();
			}
		//tenant = await Core.Services.Tenant.getLatestModified();
		// console.log('page :: tenant :: ', data);
		isLoading = false;
	});
</script>

<svelte:head>
	<link rel="icon" href={tenant?.website?.siteFavicon} />
</svelte:head>

<!-- <svelte:window
	on:sveltekit:navigation-start={() => {
		$NavigationStore = 'loading';
		console.log('NavigationStore :: "');
	}}
	on:sveltekit:navigation-end={() => {
		$NavigationStore = 'loaded';
		console.log('NavigationStore :: "');
	}}
/> -->

<!-- {#if data?.sections}
	<div class="submenu">
		{#each data?.sections as section}
			<a href="/settings/{section.slug}">{section.title}</a>
		{/each}
	</div>
{/if} -->

{#if $NavigationStore === 'loading'}
	<div>
		<Spinner />
	</div>
{/if}

<!-- <Notifications /> -->
{#if isLoading}
	<img src={image} class="loading-img" alt="loading" />
	<div class="loader">Loading...</div>
	<Spinner />
{:else if error}
	<div class="error">Something went wrong. Please try again later.</div>
{/if}
<!-- {:else} -->
<!-- <Www.SEO /> -->
{#if containsRoute('checkout_test')}
	<!-- <Checkout /> -->
	<!-- <slot /> -->
{/if}

{#if data && Core && browser}
	{#if inIframe()}
		<!-- <Checkout /> -->
		<!-- <slot /> -->
	{:else}
		<Core.Components.SEO />
		<Core.Components.Web.Background />
		<Core.Components.Web.Open />
		<Core.Components.Web.Overlay.Logo />
		<Core.Components.Web.Overlay.AgeGate />
		{#if !containsRoute('checkout_test')}
			{#if containsRoute('/admin')}
				<div />
			{:else if $NavigationStore === 'loaded' && (isRoute('/') || isRoute(base))}
				<!-- <Landing.default /> -->
				<!-- {:else if !inIframe()} -->
				<Core.Components.Web.MediaRow />
				<Core.Components.Web.Landing />
				<Core.Components.Web.Navigation />
				<!-- <Core.Components.Google.Calendar /> -->
				<!--
				<Store.Cart />-->
			{:else}
				<Core.Components.Web.MediaRow />
				<Core.Components.Web.Navigation />
			{/if}
			<!-- <Landing.default /> -->
			<!-- {#if !isCheckout()} -->
			<!-- <slot /> -->
			<!-- <Store.Cart /> -->
			<slot />
			<Core.Components.Web.MediaRow />
			<Core.Components.Web.Footer />
		{/if}
		<Core.Components.Web.Store.Cart />
	{/if}
{/if}

<!-- {/if} -->

<!-- {/if} -->
<style>
	.loader {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		font-size: 2rem;
	}
	.loading-img {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 540px;
		margin: 0px auto;
		margin-top: 5rem;
	}

	.error {
		color: red;
		font-size: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
</style>
