<script lang="ts">
	import Icon from '@iconify/svelte';
	let searchOpen = false;
	let searchInput = '';

	function checkForFocusOut(node: Node, callback: Function) {
		const handleClick = (event: MouseEvent) => {
			if (node && !node.contains(event.target as Node) && !searchInput) {
				callback();
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<div class="container">
	{#if searchOpen}
		<div class="input" use:checkForFocusOut={() => (searchOpen = false)}>
			<div class="icon">
				<Icon icon="octicon:search-16" height="18" width="18" />
			</div>
			<input bind:value={searchInput} type="text" placeholder="Search" />
			{#if searchInput}
				<button
					class="icon"
					on:click={() => {
						searchInput = '';
						searchOpen = false;
					}}
				>
					<Icon icon="octicon:x-16" height="18" width="18" />
				</button>
			{/if}
		</div>
	{:else}
		<button class="icon icon--closed" on:click={() => (searchOpen = true)}>
			<Icon icon="octicon:search-16" height="18" width="18" />
		</button>
	{/if}

	<select name="sort">
		<option disabled>Sort by</option>
		<option>Recents</option>
		<option>Recently Added</option>
		<option>Alphabetical</option>
		<option>Creator</option>
	</select>
</div>

<style lang="scss">
	.container {
		display: flex;
		align-items: center;
	}

	.input {
		display: flex;
		align-items: center;
		background-color: var(--background-grey);
		padding: 7px;
		width: 170px;
		margin-left: 8px;
		border-radius: 8px;
	}

	.icon {
		margin-right: 8px;
		margin-left: 4px;

		&--closed {
			margin-left: 12px;
			padding: 7px;

			&:hover {
				cursor: pointer;
			}
		}
	}

	input {
		width: 100%;
	}

	select {
		color: white;
		margin-left: auto;
		margin-right: 16px;
		padding-left: 16px;
	}

	option {
		background-color: var(--background-grey);
	}
</style>
