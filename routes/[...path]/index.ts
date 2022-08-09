import type { RequestHandler } from '@sveltejs/kit'

import errorFromValue from '$lib/error/from/value'

export const GET: RequestHandler = ({ params: { path } }) => {
	try {
		return {
			headers: { 'content-type': 'text/html' },
			body: `${path}<script src="/edit.js?v=${VERSION}" async></script>`
		}
	} catch (value) {
		const { code, message } = errorFromValue(value)
		return { status: code, body: message }
	}
}

export const POST: RequestHandler = ({ request, params: { path } }) => {
	try {
	} catch (value) {
		const { code, message } = errorFromValue(value)
		return { status: code, body: message }
	}
}
