import { updateAuthTokenWithRefreshToken } from '../authHandler';

export async function getProfile() {
	const accessToken = localStorage.getItem('access_token');

	const response = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	});

	if (response.ok) {
		return response.json();
	} else {
		if (response.status === 401) {
			await updateAuthTokenWithRefreshToken();
			return getProfile();
		}
	}
}

export async function getSavedAlbums() {
	const accessToken = localStorage.getItem('access_token');

	const response = await fetch('https://api.spotify.com/v1/me/albums', {
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	});

	if (response.ok) {
		return response.json();
	} else {
		if (response.status === 401) {
			await updateAuthTokenWithRefreshToken();
			return getSavedAlbums();
		}
	}
}

export async function getSavedPodcasts() {
	const accessToken = localStorage.getItem('access_token');

	const response = await fetch('https://api.spotify.com/v1/me/shows', {
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	});

	if (response.ok) {
		return response.json();
	} else {
		if (response.status === 401) {
			await updateAuthTokenWithRefreshToken();
			return getSavedAlbums();
		}
	}
}

export async function getSavedPlaylists() {
	const accessToken = localStorage.getItem('access_token');

	const response = await fetch('https://api.spotify.com/v1/me/playlists', {
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	});

	if (response.ok) {
		return response.json();
	} else {
		if (response.status === 401) {
			await updateAuthTokenWithRefreshToken();
			return getSavedAlbums();
		}
	}
}
