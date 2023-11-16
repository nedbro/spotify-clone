<script lang="ts">
	import { page } from '$app/stores';
	import ProfileTitleCard from '$lib/components/ProfileTitleCard.svelte';
	import Table from '$lib/components/Table.svelte';
	import { getFormattedLength } from '$lib/helpers/time-format.helper';
	import { SpotifyCustomApi } from '$lib/spotify/api';
	import type { ProfileTitleCardData } from '$lib/types/ProfileTitleCardData';
	import Icon from '@iconify/svelte';

	let data: SpotifyApi.SingleAlbumResponse | undefined;

	$: {
		getAlbum($page.params.albumId);
	}

	const getAlbum = async (id: string) => {
		data = await SpotifyCustomApi.album.getAlbum(id);
	};

	const createTitleCardData = (input: SpotifyApi.SingleAlbumResponse): ProfileTitleCardData => {
		return {
			imageUrl: input.images[0].url,
			type: input.type,
			title: input.name,
			creator: input.artists.map((artist) => artist.name).join(', '),
			extraInfo: `${input.release_date.split('-')[0]} • ${input.total_tracks} songs`
		};
	};

	const createTableConfig = () => {
		if (data === undefined) {
			return;
		}
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
			dataSource: data.tracks.items.map((track) => {
				return {
					track_number: track.track_number,
					name: track.name,
					duration_ms: getFormattedLength(track.duration_ms / 1000)
				};
			})
		};
	};
</script>

{#if data}
	<div class="profileTitleCard">
		<ProfileTitleCard data={createTitleCardData(data)} />
	</div>

	<div class="tracksContainer">
		<button class="color-project-green action-icon">
			{#if true}
				<Icon icon="octicon:play-24" width="48px" height="48px" />
			{:else}
				<Icon icon="mdi:play" width="28px" height="28px" />
			{/if}
		</button>

		<button class="color-project-green">
			<Icon icon="mdi:heart" width="48px" height="48px" />
		</button>

		<Table config={createTableConfig()} />
	</div>
{/if}

<style lang="scss">
	.profileTitleCard {
		margin: 6rem 0 1rem 0;
	}

	.action-icon {
		cursor: pointer;
		margin-left: 12px;
		margin-bottom: 8px;
	}

	.tracksContainer {
		margin-top: 2rem;
	}
</style>
