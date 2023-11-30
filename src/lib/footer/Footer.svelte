<script lang="ts">
	import { playerStateStore, playerStore } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';
	import PlayingSection from './components/PlayingSection.svelte';
	import TrackSection from './components/TrackSection.svelte';
	import VolumeSection from './components/VolumeSection.svelte';
	import { SpotifyCustomApi } from '$lib/spotify/api';

	onMount(() => {
		SpotifyCustomApi.playback.initializeSpotifyPlayer();
		SpotifyCustomApi.playback.subscribeToPlayerState();
	});

	onDestroy(() => {
		SpotifyCustomApi.playback.removeSpotifyPlayer();
	});
</script>

<footer>
	<div>
		<TrackSection />
	</div>
	<div>
		<PlayingSection
			on:togglePlaying={() => $playerStore?.togglePlay()}
			on:toggleProgress={(event) => $playerStore?.seek(event.detail.value)}
			on:toggleRepeat={(event) => SpotifyCustomApi.playback.toggleRepeat(event.detail.value)}
			on:toggleShuffle={(event) => SpotifyCustomApi.playback.toggleShuffle(event.detail.value)}
			on:next={() => $playerStore?.nextTrack()}
			on:previous={() => $playerStore?.previousTrack()}
		/>
	</div>
	<div>
		<VolumeSection
			on:toggleVolume={(event) => {
				$playerStore?.setVolume(event.detail.volume);
				$playerStateStore.volume = event.detail.volume;
			}}
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
