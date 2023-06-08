// import { error } from '@sveltejs/kit';
export const ssr = false;
export const prerender = false;

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return params;
	// throw error(404, 'Not found');
}