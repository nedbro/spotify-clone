<script lang="ts">
	import { page } from '$app/stores';
	import ProfileTitleCard from '$lib/components/ProfileTitleCard.svelte';
	import { SpotifyCustomApi } from '$lib/spotify/api';
	import type { ProfileTitleCardData } from '$lib/types/ProfileTitleCardData';

	let data: SpotifyApi.SingleShowResponse | undefined;

	$: {
		getPodcast($page.params.podcastId);
	}

	const getPodcast = async (id: string) => {
		data = await SpotifyCustomApi.podcast.getPodcast(id);
	};

	const createTitleCardData = (input: SpotifyApi.SingleShowResponse): ProfileTitleCardData => {
		return {
			imageUrl: input.images[0].url,
			type: input.type,
			title: input.name,
			creator: input.publisher,
			extraInfo: `${input.episodes.total} episodes`,
		};
	};
</script>

{#if data}
	<ProfileTitleCard data={createTitleCardData(data)} />
{/if}
