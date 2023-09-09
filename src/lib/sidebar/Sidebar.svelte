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

		display: flex;
		flex-direction: column;
	}
</style>
