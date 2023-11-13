import { updateAuthTokenWithRefreshToken } from '../authHandler';

export async function getPodcast(id: string): Promise<SpotifyApi.SingleShowResponse> {
	const accessToken = localStorage.getItem('access_token');

	const response = await fetch(`https://api.spotify.com/v1/shows/${id}`, {
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	});

	if (response.ok) {
		const data = await response.json();
		return data as SpotifyApi.SingleShowResponse;
	} else if (response.status === 401) {
		await updateAuthTokenWithRefreshToken();
		return getPodcast(id);
	} else {
		throw new Error('Error fetching podcast');
	}
}
