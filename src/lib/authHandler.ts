const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = 'http://localhost:5173';

export function logOut() {
	localStorage.removeItem('access_token');
	localStorage.removeItem('code_verifier');
	window.location.href = '/';
}

function generateRandomString(length: number) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

async function generateCodeChallenge(codeVerifier: string) {
	function base64encode(input: ArrayBuffer) {
		return btoa(String.fromCharCode.apply(null, new Uint8Array(input) as any as number[]))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
	}

	const encoder = new TextEncoder();
	const data = encoder.encode(codeVerifier);
	const digest = await window.crypto.subtle.digest('SHA-256', data);

	return base64encode(digest);
}

export async function createAuthUrl(): Promise<string> {
	const codeVerifier = generateRandomString(128);
	const codeChallenge = await generateCodeChallenge(codeVerifier);
	const state = generateRandomString(16);
	const scope = 'user-read-private user-read-email';

	localStorage.setItem('code_verifier', codeVerifier);

	const args = new URLSearchParams({
		response_type: 'code',
		client_id: clientId,
		scope: scope,
		redirect_uri: redirectUri,
		state: state,
		code_challenge_method: 'S256',
		code_challenge: codeChallenge
	});

	return new Promise(function (resolve) {
		resolve('https://accounts.spotify.com/authorize?' + args);
	});
}

export async function getAuthTokens(code: string) {
	const body = new URLSearchParams({
		grant_type: 'authorization_code',
		code: code,
		redirect_uri: redirectUri,
		client_id: clientId,
		code_verifier: localStorage.getItem('code_verifier') ?? ''
	});

	return fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: body
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('HTTP status ' + response.status);
			}

			return response.json();
		})
		.then((data) => {
			localStorage.setItem('access_token', data.access_token);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

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
		logOut();
	}
}
