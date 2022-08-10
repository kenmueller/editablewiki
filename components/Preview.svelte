<script lang="ts">
	export let value: string
</script>

<iframe srcdoc={value} title="Preview" />

<style lang="scss">
	iframe {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
</style>
