<script>
	import Navigation from './Navigation.svelte';
	import Library from './Library.svelte';
</script>

<sidebar>
	<Navigation />
	<Library />
</sidebar>

<style>
	sidebar {
		flex: 20%;
		margin-right: 4px;

		display: flex;
		flex-direction: column;
	}
</style>
