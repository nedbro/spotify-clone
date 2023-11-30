import {
	initializeSpotifyPlayer,
	subscribeToPlayerState,
	removeSpotifyPlayer
} from '$lib/spotify/web-playback';
import { getAlbum } from './apis/album';
import {
	getProfile,
	getSavedAlbums,
	getSavedPlaylists,
	getSavedPodcasts,
	play,
	toggleRepeat,
	toggleShuffle,
	transferPlayback
} from './apis/meApi';
import { getPlaylist } from './apis/playlist';
import { getPodcast } from './apis/podcast';
import { createAuthUrl, getAuthTokens } from './authHandler';

export const SpotifyCustomApi = {
	user: { getSavedAlbums, getSavedPodcasts, getSavedPlaylists, getProfile, play },
	album: { getAlbum },
	podcast: { getPodcast },
	playlist: { getPlaylist },
	auth: {
		createAuthUrl,
		getAuthTokens
	},
	playback: {
		subscribeToPlayerState,
		initializeSpotifyPlayer,
		removeSpotifyPlayer,
		transferPlayback,
		toggleRepeat,
		toggleShuffle
	}
};
