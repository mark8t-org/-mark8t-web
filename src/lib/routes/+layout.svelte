<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { browser } from '$app/environment';

	// import Checkout from "./checkout_test/+page.svelte";

	/** @type {import('./$types').LayoutData} */
	export let data;
	export let error = false;

	let image = import.meta.env.VITE_SEO_IMAGE;

	let Core: typeof any | null;
	let Components;
	let Stores;
	let Navigation = '';

	let tenant: any | null;
	$: pageName = $page.route.id;

	let isLoading = true;

	/* COOKIE STUFF */
	const categories = {
		analytics: function () {
			console.info('Dropped analytics cookies');
		},
		necessary: function () {
			console.info('Dropped necessary cookies');
		},
		tracking: function () {
			console.info('Dropped tracking cookies');
		},
		marketing: function () {
			console.info('Dropped marketing cookies');
		}
	};

	/* COOKIE STUFF */
	const choices = {};

	// this checks if the current route is in the current pathname
	function containsRoute(route: string) {
		return $page?.url?.pathname.indexOf(route) > -1;
	}

	//checks if the current route in the current path
	function isRoute(route: string) {
		// console.log($page?.url.pathname, route);
		return $page?.url.pathname === route;
	}

	//...
	function originIsNotIframe() {
		return true; //window.location.origin === window.parent.location.origin;
	}

	// checks if the route is equal to checkout
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
		Navigation = 'loading';
	});

	afterNavigate(() => {
		Navigation = 'loaded';
	});

	//...
	onMount(async () => {
		Core = data.props?.Core || null;
		tenant = data.props?.Tenant || null;

		Components = (await Core?.Components) || null;
		Stores = (await Core?.Stores) || null;

		if (Core && Core.Services && Core.Services.Auth) {
			if (Core.Services.Auth.getAccountTimeToLive()) {
				Core.Services.Auth.getPermissions();
			}
			Navigation = 'loaded';
		}
		isLoading = false;
	});
</script>

<svelte:head>
	<link rel="icon" href={tenant?.website?.siteFavicon} />
</svelte:head>

<svelte:window
	on:sveltekit:navigation-start={() => {
		Navigation = 'loading';
		console.log('NavigationStore :: "');
	}}
	on:sveltekit:navigation-end={() => {
		Navigation = 'loaded';
		console.log('NavigationStore :: "');
	}}
/>

<!-- {#if data?.sections}
	<div class="submenu">
		{#each data?.sections as section}
			<a href="/settings/{section.slug}">{section.title}</a>
		{/each}
	</div>
{/if} -->

{#if data && Core && browser}
	{#if Navigation === 'loading'}
		<div>
			<Core.Components.Spinner />
		</div>
	{/if}

	<!-- <Notifications /> -->
	{#if isLoading}
		<img src={image} class="loading-img" alt="loading" />
		<!-- <div class="loader">Loading...</div> -->
		<Core.Components.Spinner />
	{:else if error}
		<div class="error">Something went wrong. Please try again later.</div>
	{/if}
	<!-- {:else} -->
	<!-- <Www.SEO /> -->
	{#if containsRoute('checkout_test')}
		<!-- <Checkout /> -->
		<!-- <slot /> -->
	{/if}

	{#if inIframe()}
		<!-- <Checkout /> -->
		<!-- <slot /> -->
	{:else}
		<Core.Components.SEO />

		{#if !containsRoute('admin')}
			<Core.Components.Web.Background />
			<Core.Components.Web.Open />
			<Core.Components.Web.Overlay.Logo />
			<Core.Components.Web.Overlay.AgeGate />
			<Core.Components.Web.Overlay.Cookies cookieName="test_gdpr" {categories} {choices} />
		{/if}

		{#if !containsRoute('checkout_test')}
			<!-- -->
			{#if containsRoute('/admin')}
				<div />
			{:else if Navigation === 'loaded' && (isRoute('/') || isRoute(base))}
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

			<!-- -->

			<!-- <Landing.default /> -->
			<!-- {#if !isCheckout()} -->
			<!-- <slot /> -->
			<!-- <Store.Cart /> -->
			<slot />

			{#if !containsRoute('admin')}
				<Core.Components.Web.MediaRow />

				<Core.Components.Web.Footer />
			{/if}
		{/if}

		{#if !containsRoute('admin')}
			<Core.Components.Web.Store.Cart />
		{/if}
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
