import type { RequestHandler } from '@sveltejs/kit'
import { getStorage } from 'firebase-admin/storage'

import admin from '$lib/firebase/admin'
import errorFromValue from '$lib/error/from/value'

const storage = getStorage(admin).bucket()

export const GET: RequestHandler = async ({ params: { path } }) => {
	try {
		const [file] = await storage.file(encodeURIComponent(path)).get()

		return {
			headers: { 'content-type': 'text/html' },
			body: `${file.toString()}<script src="/edit.js?v=${VERSION}" async></script>`
		}
	} catch (value) {
		const { code, message } = errorFromValue(value)
		return { status: code, body: message }
	}
}

export const POST: RequestHandler = async ({ request, params: { path } }) => {
	try {
		const html = await request.text()
		const file = storage.file(encodeURIComponent(path))

		await (html.trim()
			? file.save(html, { contentType: 'text/html' })
			: file.delete())

		return { body: '' }
	} catch (value) {
		const { code, message } = errorFromValue(value)
		return { status: code, body: message }
	}
}
