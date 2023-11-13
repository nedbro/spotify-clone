<script lang="ts">
	import { page } from '$app/stores';
	import ProfileTitleCard from '$lib/components/ProfileTitleCard.svelte';
	import { SpotifyCustomApi } from '$lib/spotify/api';
	import type { ProfileTitleCardData } from '$lib/types/ProfileTitleCardData';

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
</script>

{#if data}
	<ProfileTitleCard data={createTitleCardData(data)} />
{/if}
