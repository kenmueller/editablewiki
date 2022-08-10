/* eslint-disable */

;((window, document) => {
	const normalizePath = path =>
		`/${path.replace(/^\/+/, '').replace(/\/+$/, '')}`

	const join = (a, b) => {
		a = normalizePath(a)
		b = normalizePath(b)

		return `${a === '/' ? '' : a}${b}`
	}

	const container = document.createElement('div')
	const shadow = container.attachShadow({ mode: 'closed' })

	const style = document.createElement('style')

	style.textContent = `
		a {
			position: fixed;
			top: 1rem;
			right: 1rem;
			text-decoration: none;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
			color: #007aff;
			opacity: 0.7;
			z-index: 9999;
			transition: opacity 0.3s;
		}

		a:hover {
			opacity: 1;
		}
	`

	const link = document.createElement('a')

	link.href = join(window.location.pathname, '~edit~')
	link.textContent = 'Edit'

	shadow.append(style, link)
	document.body.append(container)

	document.currentScript.remove()
})(window, document)
