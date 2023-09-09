<script>
	import YourLibrary from './components/YourLibrary.svelte';
	import TypeFilter from './components/TypeFilter.svelte';
	import Search from './components/Search.svelte';
</script>

<div class="container">
	<YourLibrary />
	<TypeFilter />
	<Search />
</div>

<style lang="scss">
	.container {
		background-color: #121212;
		border-radius: 1rem;
		height: 100%;
		padding: 8px;

		flex: 85%;
	}
</style>
