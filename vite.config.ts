import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl'
const mode = process.env.APP_ENV;
import { searchForWorkspaceRoot } from 'vite'
import { defineConfig } from 'vitest/config';

export default defineConfig({
	mode: mode,
	plugins: [
		sveltekit(),
		basicSsl()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		port: 4200,
		fs: {
			strict: false,
			allow: [
				// search up for workspace root
				searchForWorkspaceRoot(process.cwd()),
				// your custom rules
				'../@mark8t/core/src/lib/index.js',
			],
		},

	},
	resolve: {
		dedupe: [],
	},
	optimizeDeps: {
		include: [],
	}
});