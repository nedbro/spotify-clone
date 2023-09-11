<script lang="ts">
	import type { FooterInfo } from '$lib/types/FooterInfo';
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
