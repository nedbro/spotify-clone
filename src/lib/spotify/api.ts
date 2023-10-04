import { createAuthUrl, getAuthTokens } from './authHandler';
import { getProfile, getSavedAlbums, getSavedPlaylists, getSavedPodcasts } from './me/meApi';

export const SpotifyApi = {
	getProfile: getProfile,
	createAuthUrl: createAuthUrl,
	getAuthTokens: getAuthTokens,
	getSavedAlbums: getSavedAlbums,
	getSavedPodcasts: getSavedPodcasts,
	getSavedPlaylists: getSavedPlaylists
};
