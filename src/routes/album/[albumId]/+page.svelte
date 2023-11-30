<script lang="ts">
	import { page } from '$app/stores';
	import ProfileTitleCard from '$lib/components/ProfileTitleCard.svelte';
	import Table from '$lib/components/Table.svelte';
	import { getFormattedLength } from '$lib/helpers/time-format.helper';
	import { SpotifyCustomApi } from '$lib/spotify/api';
	import type { ProfileTitleCardData } from '$lib/types/ProfileTitleCardData';
	import Icon from '@iconify/svelte';
	import { writable } from 'svelte/store';

	$: data = writable<undefined | SpotifyApi.SingleAlbumResponse>();

	$: {
		getAlbum($page.params.albumId);
	}

	const getAlbum = async (id: string) => {
		$data = await SpotifyCustomApi.album.getAlbum(id);
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

	const createTableConfig = (data: SpotifyApi.SingleAlbumResponse) => {
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
					data: track,
					track_number: track.track_number,
					name: track.name,
					duration_ms: getFormattedLength(track.duration_ms)
				};
			})
		};
	};

	async function play(
		albumData: SpotifyApi.SingleAlbumResponse,
		trackData: SpotifyApi.TrackObjectSimplified
	) {
		await SpotifyCustomApi.user.play({
			context_uri: albumData.uri,
			offset: {
				uri: trackData.uri
			}
		});
	}
</script>

{#if $data}
	<div class="profileTitleCard">
		<ProfileTitleCard data={createTitleCardData($data)} />
	</div>

	<div class="tracksContainer">
		<Table
			config={createTableConfig($data)}
			on:rowClicked={(event) => play($data, event.detail.data.data)}
		/>
	</div>
{/if}

<style lang="scss">
	.profileTitleCard {
		margin: 6rem 0 1rem 0;
	}

	.tracksContainer {
		margin-top: 2rem;
	}
</style>
