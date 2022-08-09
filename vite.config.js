import { sveltekit } from '@sveltejs/kit/vite'

const plugins = [sveltekit()]

/** @type {import('vite').UserConfig} */
const config = {
	plugins,
	define: {
		VERSION: Date.now().toString()
	},
	server: {
		fs: {
			allow: ['.']
		}
	},
	build: {
		assetsInlineLimit: 0
	}
}

export default config
