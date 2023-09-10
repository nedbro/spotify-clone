<script>
	import YourLibrary from './components/YourLibrary.svelte';
	import TypeFilter from './components/TypeFilter.svelte';
	import SearchAndSort from './components/SearchAndSort.svelte';
</script>

<div class="container">
	<YourLibrary />
	<TypeFilter />
	<SearchAndSort />
</div>

<style lang="scss">
	.container {
		background-color: var(--background-dark);
		border-radius: 1rem;
		height: 100%;
		padding: 8px;

		flex: 85%;
	}
</style>
