<script lang="ts">
	import { page } from '$app/stores';
	import ProfileTitleCard from '$lib/components/ProfileTitleCard.svelte';
	import Table from '$lib/components/Table.svelte';
	import { getFormattedLength } from '$lib/helpers/time-format.helper';
	import { SpotifyCustomApi } from '$lib/spotify/api';
	import type { ProfileTitleCardData } from '$lib/types/ProfileTitleCardData';
	import type { TableInput } from '$lib/types/Table';

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
			extraInfo: `${input.episodes.total} episodes`
		};
	};

	const createTableConfig = (data: SpotifyApi.SingleShowResponse): TableInput => {
		return {
			columns: [
				{
					key: 'track_number',
					title: '#'
				},
				{
					key: 'name',
					title: 'Title'
				},
				{
					key: 'duration_ms',
					title: 'Length'
				}
			],
			dataSource: data!.episodes.items.map((episode, index) => {
				return {
					data: episode,
					track_number: index + 1,
					name: episode.name,
					duration_ms: getFormattedLength(episode.duration_ms)
				};
			})
		};
	};

	async function play(
		playlist: SpotifyApi.SingleShowResponse,
		trackData: SpotifyApi.EpisodeObjectSimplified
	) {
		await SpotifyCustomApi.user.play({
			context_uri: playlist.uri,
			offset: {
				uri: trackData.uri
			}
		});
	}
</script>

{#if data}
	<div class="profileTitleCard">
		<ProfileTitleCard data={createTitleCardData(data)} />
	</div>

	<Table
		config={createTableConfig(data)}
		on:rowClicked={(event) => play(data, event.detail.data.data)}
	/>
{/if}

<style lang="scss">
	.profileTitleCard {
		margin: 6rem 0 1rem 0;
	}
</style>
