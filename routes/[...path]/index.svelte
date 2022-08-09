<script lang="ts">
	import { page } from '$app/stores'

	import MetaImage from '../../components/Meta/Image.svelte'
	import MetaTitle from '../../components/Meta/Title.svelte'
	import MetaDescription from '../../components/Meta/Description.svelte'
</script>

<MetaImage />
<MetaTitle />
<MetaDescription />

<main>
	<h1>Editable Wiki</h1>
	<p>{$page.params.path}</p>
	<iframe
		srcdoc="<a href='~edit~'>edit</a>"
		sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
	/>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	h1 {
		text-align: center;
	}
</style>
