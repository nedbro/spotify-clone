<script lang="ts">
	import YourLibrary from './components/YourLibrary.svelte';
	import TypeFilter from './components/TypeFilter.svelte';
	import SearchAndSort from './components/SearchAndSort.svelte';
	import PlayableGroupTile from './components/PlayableGroupTile.svelte';
	import type { PlayableGroup, PlayableGroupType } from '$lib/types/PlayableGroup';
	import { getTestPlayableGroupData } from './playableGroupData';

	type LibraryFilterAndSort = {
		type?: PlayableGroupType;
		searchInput?: string;
		sortInput?: string;
	};

	const allPlayableGroups: PlayableGroup[] = getTestPlayableGroupData();

	let filterAndSort: LibraryFilterAndSort = {};
	$: playableGroups = handleFilterAndSort(filterAndSort);

	function handleFilterAndSort(filterAndSort: LibraryFilterAndSort) {
		let playableGroups = allPlayableGroups;

		if (filterAndSort.type) {
			playableGroups = playableGroups.filter(
				(group) => group.type.value === filterAndSort.type!.value
			);
		}

		if (filterAndSort.searchInput) {
			playableGroups = playableGroups.filter((group) =>
				group.name.toLowerCase().includes(filterAndSort.searchInput!.toLowerCase())
			);
		}

		if (filterAndSort.sortInput === 'Recents') {
			playableGroups = [...playableGroups].sort(
				(a, b) => new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime()
			);
		} else if (filterAndSort.sortInput === 'Recently Added') {
			playableGroups = [...playableGroups].sort(
				(a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
			);
		} else if (filterAndSort.sortInput === 'Alphabetical') {
			playableGroups = [...playableGroups].sort((a, b) => a.name.localeCompare(b.name));
		} else if (filterAndSort.sortInput === 'Creator') {
			playableGroups = [...playableGroups].sort((a, b) => a.creator.localeCompare(b.creator));
		}

		return playableGroups;
	}
</script>

<div class="container">
	<YourLibrary />
	<TypeFilter
		on:selectType={(event) => (filterAndSort = { ...filterAndSort, type: event.detail.type })}
	/>
	<SearchAndSort
		on:search={(event) =>
			(filterAndSort = { ...filterAndSort, searchInput: event.detail.searchInput })}
		on:sort={(event) => (filterAndSort = { ...filterAndSort, sortInput: event.detail.sortInput })}
	/>

	<div class="playable-groups">
		{#each playableGroups as playableGroup}
			<PlayableGroupTile data={playableGroup} />
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		background-color: var(--background-dark);
		border-radius: 1rem;
		padding: 8px;

		flex: 85%;

		max-height: 100%;
		overflow: hidden;

		&:hover {
			::-webkit-scrollbar-thumb {
				background: var(--text-grey);
				border-radius: 20px;
				display: block;
			}
		}

		::-webkit-scrollbar-thumb {
			display: none;
		}
	}

	.playable-groups {
		overflow: scroll;
		overflow-y: auto;
		max-height: 80%;

		@media (max-height: 800px) {
			max-height: 75%;
		}

		@media (max-height: 500px) {
			max-height: 60%;
		}
	}

	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-thumb {
		background: var(--text-grey);
		border-radius: 20px;
	}

	::-webkit-scrollbar-corner {
		display: none;
	}
</style>
