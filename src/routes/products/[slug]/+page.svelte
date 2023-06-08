<script lang="ts">
	import { onMount } from 'svelte';
	import { Components, Stores } from '@mark8t/core';

	// import type { Product } from '../../../lib/utils/types';

	let product: any;
	export let data;

	/** @type {import('./$types').PageData} */
	onMount(async () => {
		product = await Stores.Products.getProductBySlug(data.slug);
	});
	export let price = false;
</script>

<section id="section__product" class="mark8t-section">
	{#if product == null}
		<Components.SEO title={'Product - Not Found'} />
		<div class="center">
			<p>Product not found</p>
		</div>
	{:else}
		<Components.SEO title={'Product - ' + product.name} />
		<Components.Web.Store.Product data={product} />

		{#if product.available && product.price}
			<Components.Web.Store.AddToCart {product} />
		{/if}
	{/if}

	<Components.Web.Store.ProductsWithFilter
		label="related products"
		title="in stock"
		includeByTags={['in stock', 'merch']}
		excludeByTag="Out of Stock"
		exclude={product?.id}
		{price}
		displayCount={3}
		displayTotal={3}
	/>

	<Components.Web.Store.Banner
		subtitle="Subscribe to our newsletter to get the latest updates and offers."
	/>
	<br />
</section>
