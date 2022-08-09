const normalizePath = (path: string) =>
	path.replace(/^\/+/, '').replace(/\/+$/, '')

export default normalizePath
