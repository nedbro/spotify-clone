<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import { types, type PlayableGroupType } from '$lib/types/PlayableGroup';

	let selectedType: PlayableGroupType | undefined;

	const dispatch = createEventDispatcher();

	function selectType(type?: PlayableGroupType) {
		if (!type || type === selectedType) {
			dispatch('selectType', {type: undefined});
			selectedType = undefined;
			return;
		}

		selectedType = type;
		dispatch('selectType', { type });
	}
</script>

<div class="selector-container">
	{#if selectedType}
		<button class="icon-button" on:click={() => selectType(selectedType)}>
			<Icon icon="ph:x" width="25" height="25" />
		</button>
		<button class="selector selector--selected" on:click={() => selectType(selectedType)}>
			{selectedType.name}
		</button>
	{:else}
		{#each types as type}
			<button class="selector" on:click={() => selectType(type)}>{type.name}</button>
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
			opacity: 0.8;
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
