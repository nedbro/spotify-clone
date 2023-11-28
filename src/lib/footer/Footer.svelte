<script lang="ts">
	import { playerStateStore, playerStore } from '$lib/stores';
	import type { FooterInfo } from '$lib/types/FooterInfo';
	import { onDestroy, onMount } from 'svelte';
	import { get } from 'svelte/store';
	import PlayingSection from './components/PlayingSection.svelte';
	import TrackSection from './components/TrackSection.svelte';
	import VolumeSection from './components/VolumeSection.svelte';

	const imageUrl =
		'https://upload.wikimedia.org/wikipedia/en/a/a2/Interpol_-_El_Pintor_cover_art.jpg';

	let footerExample: FooterInfo = {
		title: 'Song Titleasdasdasdasdasdasdasdasdasd',
		imageUrl,
		creator: 'Artist Name',
		lengthInSeconds: 240, // Length of the song in seconds (4 minutes)
		atSeconds: 120, // Current playback position at 2 minutes
		liked: false,
		playing: true,
		shuffle: true,
		repeat: true,
		volume: 50
	};

	onMount(() => {
		if (document.getElementById('spotify-player') != null) {
			document.getElementById('spotify-player')?.remove();
		}

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

			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);

				player.getCurrentState().then((state) => {
					if (!state) {
						console.error('User is not playing music through the Web Playback SDK');
						return;
					}

					playerStateStore.set({
						playing: !state.paused,
						shuffle: state.shuffle,
						repeat: state.repeat_mode != 0,
						volume: state.volume * 100,
						positionMs: state.position,
						track: {
							title: state.track_window.current_track.name,
							creator: state.track_window.current_track.artists[0].name,
							imageUrl: state.track_window.current_track.album.images[0].url,
							durationMs: state.track_window.current_track.duration_ms
						}
					});
				});
			});

			player.addListener('player_state_changed', (state) => {
				console.log(state);

				playerStateStore.set({
					playing: !state.paused,
					shuffle: state.shuffle,
					repeat: state.repeat_mode != 0,
					volume: state.volume * 100,
					positionMs: state.position,
					track: {
						title: state.track_window.current_track.name,
						creator: state.track_window.current_track.artists[0].name,
						imageUrl: state.track_window.current_track.album.images[0].url,
						durationMs: state.track_window.current_track.duration_ms
					}
				});
			});

			player.connect();

			playerStore.set(player);
		};
	});

	onDestroy(() => {
		document.getElementById('spotify-player')?.remove();
		get(playerStore)?.disconnect();
	});
</script>

<footer>
	<div>
		<TrackSection data={footerExample} />
	</div>
	<div>
		<PlayingSection
			data={footerExample}
			on:togglePlaying={() =>
				(footerExample = { ...footerExample, playing: !footerExample.playing })}
			on:toggleRepeat={() => (footerExample = { ...footerExample, repeat: !footerExample.repeat })}
			on:toggleShuffle={() =>
				(footerExample = { ...footerExample, shuffle: !footerExample.shuffle })}
			on:toggleProgress={(event) =>
				(footerExample = { ...footerExample, atSeconds: event.detail.value })}
		/>
	</div>
	<div>
		<VolumeSection
			data={footerExample}
			on:toggleVolume={(event) =>
				(footerExample = { ...footerExample, volume: event.detail.value })}
		/>
	</div>
</footer>

<style>
	footer {
		box-sizing: border-box;
		min-height: 80px;
		background-color: black;
		padding: 8px 16px;

		display: flex;
		align-items: center;
	}

	div {
		flex: 33%;
	}
</style>
