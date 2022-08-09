<script lang="ts">
	import MetaImage from '../../components/Meta/Image.svelte'
	import MetaTitle from '../../components/Meta/Title.svelte'
	import MetaDescription from '../../components/Meta/Description.svelte'
	import Editor from '../../components/Editor.svelte'

	let value = `<!DOCTYPE html>
<html dir="ltr" lang="en-US">
	<head>
		<meta charset="utf-8">
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1, viewport-fit=cover"
		>
		<style>
			* {
				box-sizing: border-box;
			}

			body {
				font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
					Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
					'Helvetica Neue', sans-serif;
			}
		</style>
		<title>Editable Wiki</title>
	</head>
	<body>
		<h1>Editable Wiki</h1>
	</body>
</html>
`

	$: console.log(value)
</script>

<MetaImage />
<MetaTitle />
<MetaDescription />

<main>
	<Editor class="editor" bind:value autoFocus />
	<iframe title="Preview" srcdoc={value} />
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: 1fr 1fr;
		height: 100%;
	}
</style>
