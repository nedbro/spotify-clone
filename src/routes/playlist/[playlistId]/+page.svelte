<script lang="ts">
	import { page } from '$app/stores';
	import ProfileTitleCard from '$lib/components/ProfileTitleCard.svelte';
	import Table from '$lib/components/Table.svelte';
	import { getFormattedLength } from '$lib/helpers/time-format.helper';
	import { SpotifyCustomApi } from '$lib/spotify/api';
	import type { ProfileTitleCardData } from '$lib/types/ProfileTitleCardData';
	import type { TableInput } from '$lib/types/Table';

	let data: SpotifyApi.SinglePlaylistResponse | undefined;

	$: {
		getPlaylist($page.params.playlistId);
	}

	const getPlaylist = async (id: string) => {
		data = await SpotifyCustomApi.playlist.getPlaylist(id);
	};

	const createTitleCardData = (input: SpotifyApi.SinglePlaylistResponse): ProfileTitleCardData => {
		return {
			imageUrl: input.images[0].url,
			type: input.type,
			title: input.name,
			creator: input.owner.display_name ?? 'Unknown',
			extraInfo: `${input.tracks.total} songs`
		};
	};

	const createTableConfig = (data: SpotifyApi.SinglePlaylistResponse): TableInput => {
		return {
			columns: [
				{
					key: 'track_number',
					title: '#'
				},
				{
					key: 'name',
					title: 'Title'
				},
				{
					key: 'duration_ms',
					title: 'Length'
				}
			],
			dataSource: data!.tracks.items
				.filter((track) => track.track !== null)
				.map((track, index) => {
					return {
						track_number: index + 1,
						name: track.track!.name,
						duration_ms: getFormattedLength(track.track!.duration_ms / 1000)
					};
				})
		};
	};
</script>

{#if data}
	<div class="profileTitleCard">
		<ProfileTitleCard data={createTitleCardData(data)} />
	</div>

	<Table config={createTableConfig(data)} />
{/if}

<style lang="scss">
	.profileTitleCard {
		margin: 6rem 0 1rem 0;
	}
</style>
