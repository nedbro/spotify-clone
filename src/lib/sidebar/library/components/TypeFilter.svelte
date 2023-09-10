<script lang="ts">
	import Icon from '@iconify/svelte';

	const types = ['Playlists', 'Albums', 'Podcasts & Shows'];
	let selectedType: string | undefined;

	function selectType(type?: string) {
		if (!type) return;

		if (type === selectedType) {
			selectedType = undefined;
			return;
		}

		selectedType = type;
	}
</script>

<div class="selector-container">
	{#if selectedType}
		<button class="icon-button" on:click={() => selectType(selectedType)}>
			<Icon icon="ph:x" width="25" height="25" />
		</button>
		<button class="selector selector--selected" on:click={() => selectType(selectedType)}>
			{selectedType}
		</button>
	{:else}
		{#each types as type}
			<button class="selector" on:click={() => selectType(type)}>{type}</button>
		{/each}
	{/if}
</div>

<style lang="scss">
	.selector-container {
		display: flex;
		margin-bottom: 16px;
		align-items: center;
	}

	.selector {
		background-color: var(--background-grey);
		padding: 10px;
		border-radius: 32px;
		width: fit-content;
		font-size: 0.8rem;
		margin-left: 8px;

		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;

		&:hover {
			cursor: pointer;
			opacity: 0.8
		}

		&--selected {
			background-color: white;
			color: black;

			&:hover {
				background-color: white;
				color: black;
			}
		}
	}

	.icon-button {
		margin-left: 8px;
		color: white;
		background-color: var(--background-grey);
		border-radius: 100%;
		padding: 4px;

		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			cursor: pointer;
		}
	}
</style>
