import { dev } from '$app/environment';
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
	} else if (response.status === 401) {
		await updateAuthTokenWithRefreshToken();
		return getProfile();
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
	} else if (response.status === 401) {
		await updateAuthTokenWithRefreshToken();
		return getSavedAlbums();
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

export async function play({
	context_uri,
	uris,
	offset
}: {
	context_uri?: string;
	uris?: string[];
	offset?: { position?: number; uri?: string };
}) {
	const accessToken = localStorage.getItem('access_token');

	const response = await fetch('https://api.spotify.com/v1/me/player/play', {
		method: 'PUT',
		headers: {
			Authorization: 'Bearer ' + accessToken
		},
		body: JSON.stringify({
			context_uri,
			uris,
			position_ms: 0,
			offset
		})
	});

	if (response.ok) {
		return Promise.resolve();
	} else {
		if (response.status === 401) {
			await updateAuthTokenWithRefreshToken();
			return play({ context_uri, uris, offset });
		}
	}
}

export async function transferPlayback(deviceId: string) {
	const accessToken = localStorage.getItem('access_token');

	const response = await fetch('https://api.spotify.com/v1/me/player', {
		method: 'PUT',
		headers: {
			Authorization: 'Bearer ' + accessToken
		},
		body: JSON.stringify({
			device_ids: [deviceId]
		})
	});

	if (response.ok) {
		return Promise.resolve();
	} else {
		if (response.status === 401) {
			await updateAuthTokenWithRefreshToken();
			return getSavedAlbums();
		}
	}
}
export async function toggleShuffle(value: boolean) {
	const accessToken = localStorage.getItem('access_token');

	const response = await fetch(
		'https://api.spotify.com/v1/me/player/shuffle?' +
			new URLSearchParams({ state: value.toString() }),
		{
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + accessToken
			}
		}
	);

	if (response.ok) {
		return Promise.resolve();
	} else {
		if (response.status === 401) {
			await updateAuthTokenWithRefreshToken();
			return getSavedAlbums();
		}
	}
}
export async function toggleRepeat(value: boolean) {
	const accessToken = localStorage.getItem('access_token');

	const response = await fetch(
		'https://api.spotify.com/v1/me/player/repeat?' +
			new URLSearchParams({ state: value ? 'context' : 'off' }),
		{
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + accessToken
			}
		}
	);

	if (response.ok) {
		return Promise.resolve();
	} else {
		if (response.status === 401) {
			await updateAuthTokenWithRefreshToken();
			return getSavedAlbums();
		}
	}
}
