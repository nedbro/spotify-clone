import { createAuthUrl, getAuthTokens } from './authHandler';
import { getProfile, getSavedAlbums, getSavedPlaylists, getSavedPodcasts } from './apis/meApi';
import { getAlbum } from './apis/album';
import { getPodcast } from './apis/podcast';
import { getPlaylist } from './apis/playlist';

export const SpotifyCustomApi = {
	user: { getSavedAlbums, getSavedPodcasts, getSavedPlaylists, getProfile },
	album: { getAlbum },
	podcast: { getPodcast },
	playlist: { getPlaylist },
	auth: {
		createAuthUrl,
		getAuthTokens
	}
};
