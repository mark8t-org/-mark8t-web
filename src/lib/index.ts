// import all routes found in src/routes

import Admin from './routes/admin/+page.svelte';
import Calendar from './routes/calendar/+page.svelte';
import Cart from './routes/cart/+page.svelte';
import Checkout from './routes/checkout/+page.svelte';
import Events from './routes/events/+page.svelte';
import Location from './routes/location/+page.svelte';
import Ontap from './routes/ontap/+page.svelte';
import Order from './routes/order/+page.svelte';
import Products from './routes/products/+page.svelte';
import ProductsSlug from './routes/products/[slug]/+page.svelte';
import Reciept from './routes/reciept/+page.svelte';
import Retail from './routes/retail/+page.svelte';
import Home from './routes/+page.svelte';
import Layout from './routes/+layout.svelte';

export {
	Admin,
	Calendar,
	Cart,
	Checkout,
	Events,
	Location,
	Ontap,
	Order,
	Products,
	ProductsSlug,
	Reciept,
	Retail,
	Home,
	Layout
}

export default {
	Admin,
	Calendar,
	Cart,
	Checkout,
	Events,
	Location,
	Ontap,
	Order,
	Products,
	ProductsSlug,
	Reciept,
	Retail,
	Home,
	Layout
}