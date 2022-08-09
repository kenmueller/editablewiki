<script lang="ts">
	import { onDestroy } from 'svelte'
	import { basicSetup } from 'codemirror'
	import { EditorView, keymap } from '@codemirror/view'
	import { indentWithTab } from '@codemirror/commands'
	import { indentUnit } from '@codemirror/language'
	import { html } from '@codemirror/lang-html'
	import { oneDark } from '@codemirror/theme-one-dark'

	export let value: string
	export let autoFocus = false

	let root: HTMLDivElement | null = null

	// Prevent creating a new editor when value changes
	const getValue = () => value

	$: editor =
		root &&
		new EditorView({
			parent: root,
			doc: getValue(),
			extensions: [
				basicSetup,
				indentUnit.of('\t'),
				keymap.of([indentWithTab]),
				EditorView.lineWrapping,
				html(),
				oneDark,
				EditorView.updateListener.of(({ docChanged, view }) => {
					if (docChanged) value = view.state.doc.toString()
				})
			]
		})

	$: if (autoFocus) editor?.focus()

	onDestroy(() => {
		editor?.destroy()
	})
</script>

<div {...$$restProps} bind:this={root} />

<style lang="scss">
	@font-face {
		font-family: Menlo;
		src: url('../fonts/menlo.ttf') format('truetype');
	}

	div {
		width: 100%;
		height: 100%;
		background: colors.$dark-gray;

		:global {
			.cm-editor {
				height: 100% !important;
				outline: none !important;
			}

			.cm-scroller {
				font-family: Menlo, monospace !important;
			}
		}
	}
</style>
