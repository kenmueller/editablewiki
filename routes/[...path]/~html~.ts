import type { RequestHandler } from '@sveltejs/kit'
import { getStorage } from 'firebase-admin/storage'

import admin from '$lib/firebase/admin'
import normalizePath from '$lib/path/normalize'
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
			body: data.toString()
		}
	} catch (value) {
		if ((value as { code: number }).code === ErrorCode.NotFound)
			return { status: ErrorCode.NotFound, body: 'Page not found' }

		const { code, message } = errorFromValue(value)
		return { status: code, body: message }
	}
}
