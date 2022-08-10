import normalizePath from './normalize'

const join = (a: string, b: string) => {
	a = normalizePath(a)
	b = normalizePath(b)

	return `${a === '/' ? '' : a}${b}`
}

export default join
