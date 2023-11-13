<script lang="ts">
	import { page } from '$app/stores';
	import ProfileTitleCard from '$lib/components/ProfileTitleCard.svelte';
	import { SpotifyCustomApi } from '$lib/spotify/api';
	import type { ProfileTitleCardData } from '$lib/types/ProfileTitleCardData';

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
			extraInfo: `${input.release_date.split('-')[0]} • ${input.total_tracks} songs`,
		};
	};
</script>

{#if data}
	<ProfileTitleCard data={createTitleCardData(data)} />
{/if}
