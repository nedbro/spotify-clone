import { createAuthUrl, getAuthTokens } from './authHandler';
import { getProfile, getSavedAlbums, getSavedPlaylists, getSavedPodcasts } from './apis/meApi';
import { getAlbum } from './apis/album';

export const SpotifyCustomApi = {
	user: { getSavedAlbums, getSavedPodcasts, getSavedPlaylists, getProfile },
	album: { getAlbum },
	auth: {
		createAuthUrl,
		getAuthTokens
	}
};
