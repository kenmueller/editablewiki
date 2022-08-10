import type { RequestHandler } from '@sveltejs/kit'
import { getStorage } from 'firebase-admin/storage'

import admin from '$lib/firebase/admin'
import normalizePath from '$lib/path/normalize'
import join from '$lib/path/join'
import ErrorCode from '$lib/error/code'
import errorFromValue from '$lib/error/from/value'

const storage = getStorage(admin).bucket()

export const GET: RequestHandler = async ({ params: { path } }) => {
	try {
		const [data] = await storage
			.file(`pages/${encodeURIComponent(normalizePath(path))}`)
			.download()

		return {
			headers: { 'content-type': 'text/html' },
			body: `${data.toString()}<script src="/edit.js?v=${VERSION}" async></script>`
		}
	} catch (value) {
		if ((value as { code: number }).code === ErrorCode.NotFound)
			return {
				status: ErrorCode.TemporaryRedirect,
				headers: { location: join(path, '~edit~') },
				body: ''
			}

		const { code, message } = errorFromValue(value)
		return { status: code, body: message }
	}
}

export const POST: RequestHandler = async ({ request, params: { path } }) => {
	try {
		const html = (await request.text()).trim()
		const file = storage.file(
			`pages/${encodeURIComponent(normalizePath(path))}`
		)

		await (html
			? file.save(html, { contentType: 'text/html' })
			: file.delete({ ignoreNotFound: true }))

		return { body: '' }
	} catch (value) {
		const { code, message } = errorFromValue(value)
		return { status: code, body: message }
	}
}
