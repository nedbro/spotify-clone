<script lang="ts">
	import ProfileTitleCard from './ProfileTitleCard.svelte';

	import { SpotifyCustomApi } from '$lib/spotify/api';
	import { page } from '$app/stores';

	let data: SpotifyApi.SingleAlbumResponse | undefined;

	$: {
		getAlbum($page.params.albumId);
	}

	const getAlbum = async (id: string) => {
		data = await SpotifyCustomApi.album.getAlbum(id);
	};
</script>

<ProfileTitleCard {data} />
