<script>
	import Navigation from './Navigation.svelte';
	import Library from './library/Library.svelte';
</script>

<div>
	<Navigation />
	<Library />
</div>

<style>
	div {
		margin-right: 4px;
		min-width: 290px;
		max-height: calc(100vh - 88px);

		display: flex;
		flex-direction: column;
	}
</style>
