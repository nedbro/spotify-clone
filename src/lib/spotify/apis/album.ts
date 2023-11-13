import { updateAuthTokenWithRefreshToken } from '../authHandler';

export async function getAlbum(id: string): Promise<SpotifyApi.SingleAlbumResponse> {
	const accessToken = localStorage.getItem('access_token');

	const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	});

	if (response.ok) {
		const data = await response.json();
		return data as SpotifyApi.SingleAlbumResponse;
	} else if (response.status === 401) {
		await updateAuthTokenWithRefreshToken();
		return getAlbum(id);
	} else {
		throw new Error('Error fetching album');
	}
}
