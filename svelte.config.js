import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);

//
let base = '';
if (process.env.npm_lifecycle_event === 'build') {
	if (process.env.NODE_ENV === 'production') {
		base = '';
	}
}
base = '/dev/2';

console.log('BASE URL: ' + base)
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		version: {
			name: pkg.version,
		},
		adapter: adapter({
			fallback: 'index.html'
		}),
		// trailingSlash: 'always',
		paths: {
			assets: '',
			base: base
		},
		csrf: {
			checkOrigin: false,
		}
	}
};

export default config;
