import { SpotifyApi } from '$lib/spotify/api';
import { PlaylistType, type PlayableGroup, PodcastType, AlbumType } from '$lib/types/PlayableGroup';

export async function getPlayableGroups(): Promise<PlayableGroup[]> {
	const albums = (await SpotifyApi.getSavedAlbums()).items.map((item: any) => {
		const album = item.album;
		return {
			id: album.id,
			name: album.name,
			type: AlbumType,
			imageUrl: album.images.at(-1).url,
			creator: album.artists[0].name,
			lastPlayed: album.release_date,
			dateAdded: item.addet_at
		} as PlayableGroup;
	});
	const podcasts = (await SpotifyApi.getSavedPodcasts()).items.map((item: any) => {
		const podcast = item.show;

		return {
			id: podcast.id,
			name: podcast.name,
			type: PodcastType,
			imageUrl: podcast.images.at(-1).url,
			creator: podcast.publisher,
			lastPlayed: podcast.release_date,
			dateAdded: item.addet_at
		} as PlayableGroup;
	});
	const playlists = (await SpotifyApi.getSavedPlaylists()).items.map((item: any) => {
		return {
			id: item.id,
			name: item.name,
			type: PlaylistType,
			imageUrl: item.images.at(-1).url,
			creator: item.owner.display_name ?? 'unknown',
			lastPlayed: item.release_date,
			dateAdded: new Date().toISOString()
		} as PlayableGroup;
	});

	return [...albums, ...podcasts, ...playlists];
}
