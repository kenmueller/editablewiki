<script lang="ts" context="module">
	export const load: Load = async ({ params: { path }, fetch }) => {
		try {
			const response = await fetch(join(path, '~html~'))

			if (response.status === 404) return {}
			if (!response.ok) throw await errorFromResponse(response)

			return {
				props: { value: await response.text() }
			}
		} catch (value) {
			const { code, message } = errorFromValue(value)
			return { status: code, body: message }
		}
	}
</script>

<script lang="ts">
	import type { Load } from '@sveltejs/kit'

	import { page } from '$app/stores'

	import normalizePath from '$lib/path/normalize'
	import join from '$lib/path/join'
	import initialHtml from '$lib/html/initial'
	import errorFromResponse from '$lib/error/from/response'
	import errorFromValue from '$lib/error/from/value'
	import MetaImage from '../../components/Meta/Image.svelte'
	import MetaTitle from '../../components/Meta/Title.svelte'
	import MetaDescription from '../../components/Meta/Description.svelte'
	import Editor from '../../components/Editor.svelte'

	export let value = initialHtml

	$: path = normalizePath($page.params.path)

	$: willSave = Boolean(value.trim())
	let saveLoading = false

	const save = async () => {
		try {
			if (saveLoading) return
			saveLoading = true

			const response = await fetch(path, { method: 'POST', body: value })
			if (!response.ok) throw await errorFromResponse(response)

			willSave ? (window.location.href = path) : window.location.reload()
		} catch (value) {
			console.log(value)
			alert(errorFromValue(value).message)
		} finally {
			saveLoading = false
		}
	}
</script>

<MetaImage />
<MetaTitle value="{path} - Editable Wiki" />
<MetaDescription value="Edit {path} on Editable Wiki" />

<main>
	<div>
		<Editor bind:value autoFocus />
		<button
			class:delete={!willSave}
			aria-busy={saveLoading || undefined}
			on:click={save}
		>
			{willSave ? 'Publish' : 'Delete'}
		</button>
	</div>
	<iframe title="Preview" srcdoc={value} />
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: 1fr 1fr;
		height: 100%;
	}

	div {
		position: relative;
	}

	button {
		position: absolute;
		top: 1rem;
		right: 1.3rem;
		font-size: 1rem;
		font-weight: 700;
		color: colors.$blue;
		border-radius: 0.5rem;
		transition: opacity 0.3s;

		&:hover {
			opacity: 0.7;
		}
	}

	.delete {
		color: colors.$red;
	}

	[aria-busy] {
		pointer-events: none;
		opacity: 0.5;
	}
</style>
