import { browser } from '$app/environment';

export const csr = true;
export const prerender = false;
export const ssr = true;

const menu = [
	{
		name: 'HOME',
		path: '/'
	},
	{
		name: 'RETAIL',
		path: '/retail'
	},
	{
		name: 'ON TAP',
		path: '/ontap'
	},
	{
		name: 'EVENT SPACE',
		path: '/events'
	},
	{
		name: 'LOCATION',
		path: '/location'
	},
	{
		name: 'CALENDAR',
		path: '/calendar'
	},
	{
		name: 'ORDER NOW',
		path: '/order'
	}
];
// use sessions storage to ensure that Tenant has been loaded before rendering the page but not to call the server on subsuquent page loads
/** @type {import('./$types').LayoutLoad} */
export async function load({ url }) {

	let page = menu.find((p) => url.pathname.indexOf(p.path) > -1);
	if (!page)
		return {
			status: 404

		}
	if (browser) {

		const Core = (await import('@mark8t/core')).default;
		// const Admin = (await import('@mark8t/admin')).default;
		//const Admin = (await import('../../node_modules/@mark8t/admin/src/lib/+Admin.svelte')).default;
		// const Modules = (await import('../../node_modules/@mark8t/admin/src/lib/modules/index')).default;
		// console.log(Modules.EmailsPreview = (await import('../../node_modules/@mark8t/admin/src/lib/modules/index')).EmailsPreview)
		return {
			props: {
				Core: Core,
				// Admin: Admin,
				// Modules: Modules,
				Tenant: await Core.Services.Tenant.getLatestModified()
			}
		};
	}
}