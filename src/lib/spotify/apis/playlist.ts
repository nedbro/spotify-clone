import { updateAuthTokenWithRefreshToken } from '../authHandler';

export async function getPlaylist(id: string): Promise<SpotifyApi.SinglePlaylistResponse> {
	const accessToken = localStorage.getItem('access_token');

	const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	});

	if (response.ok) {
		const data = await response.json();
		return data as SpotifyApi.SinglePlaylistResponse;
	} else if (response.status === 401) {
		await updateAuthTokenWithRefreshToken();
		return getPlaylist(id);
	} else {
		throw new Error('Error fetching playlist');
	}
}
