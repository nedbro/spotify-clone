<script lang="ts">
	import { goto } from '$app/navigation';
	import { SpotifyCustomApi } from '$lib/spotify/api';
	import { onMount } from 'svelte';

	let playlists: SpotifyApi.PlaylistObjectSimplified[] = [];

	onMount(async () => {
		const data = await SpotifyCustomApi.playlist.getFeaturedPlaylists();
		playlists = data.playlists.items;
	});

	const onClick = (playlist: SpotifyApi.PlaylistObjectSimplified) => {
		SpotifyCustomApi.user.play({ context_uri: playlist.uri, offset: { position: 0 } });
		goto(`/playlist/${playlist.id}`);
	};
</script>

<div class="wrapper">
	{#each playlists as playlist}
		<div class="playlistCard" on:click={() => onClick(playlist)}>
			<img src={playlist.images[0].url} alt="" />
			<h2>{playlist.name}</h2>
			<h3>{playlist.owner.display_name}</h3>
		</div>
	{/each}
</div>

<style lang="scss">
	.wrapper {
		// grid styling with 4 columns
		display: grid;
		grid-template-columns: repeat(8, 1fr);
        
        cursor: pointer;
	}

	.playlistCard {
		height: 260px;
		width: 180px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		img {
			height: 150px;
			width: 150px;
			object-fit: cover;
			border-radius: 1rem;
			padding: 8px;
		}

		h2 {
			font-size: 1rem;
			font-weight: 500;
			margin: 0;
		}

		h3 {
			font-size: 0.8rem;
			font-weight: 400;
			margin: 0;
			color: var(--text-grey);
		}
	}
</style>
