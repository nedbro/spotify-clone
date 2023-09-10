<script>
	import Icon from '@iconify/svelte';
</script>

<div>
	<a href="/">
		<Icon icon="majesticons:home" height="25" width="25" />
		<p>Home</p>
	</a>

	<a href="/search">
		<Icon icon="octicon:search-16" height="25" width="25" />
		<p>Search</p>
	</a>
</div>

<style>
	div {
		background-color: var(--background-dark);
		border-radius: 1rem;
		height: 100%;
		padding: 8px;

		margin-bottom: 4px;
		flex: 15%;

		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	a {
		all: unset;
		color: var(--text-grey);
		display: flex;
		padding-left: 16px;
	}

	a:first-child {
		margin-bottom: 16px;
	}

	a:hover {
		cursor: pointer;
		color: white;
	}

	p {
		font-size: 16px;
		font-weight: bold;
		padding-left: 16px;
		display: flex;
		align-items: center;
	}
</style>
