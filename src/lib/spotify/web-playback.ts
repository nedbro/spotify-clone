import { SpotifyCustomApi } from '$lib/spotify/api';
import { playerStateStore, playerStore } from '$lib/stores';
import { get } from 'svelte/store';

const updateStoreFromState = (state) => {
	playerStateStore.set({
		playing: !state.paused,
		shuffle: state.shuffle,
		repeat: state.repeat_mode != 0,
		volume: 0.5,
		positionMs: state.position,
		track: {
			title: state.track_window.current_track.name,
			creator: state.track_window.current_track.artists[0].name,
			imageUrl: state.track_window.current_track.album.images[0].url,
			durationMs: state.track_window.current_track.duration_ms
		}
	});
};

export const subscribeToPlayerState = () => {
	playerStore.subscribe((player) => {
		if (!player) {
			return;
		}

		player.addListener('ready', ({ device_id }: { device_id: string }) => {
			console.log('Ready with Device ID', device_id);

			SpotifyCustomApi.playback.transferPlayback(device_id);
		});

		player.addListener('player_state_changed', (state) => {
			updateStoreFromState(state);

			player.getVolume().then((volume: number) => {
				player.setVolume(volume);
			});
		});
	});
};

export const initializeSpotifyPlayer = () => {
	if (document.getElementById('spotify-player') == null) {
		const script = document.createElement('script');
		script.setAttribute('id', 'spotify-player');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.async = true;

		document.body.appendChild(script);

		(window as any).onSpotifyWebPlaybackSDKReady = () => {
			const player = new (window as any).Spotify.Player({
				name: 'Web Playback SDK',
				getOAuthToken: (cb) => {
					cb(localStorage.getItem('access_token'));
				},
				volume: 0.5
			});

			player.connect();

			playerStore.set(player);
		};
	}
};

export const removeSpotifyPlayer = () => {
	document.getElementById('spotify-player')?.remove();
	get(playerStore)?.disconnect();
	playerStore.set(null);
};
