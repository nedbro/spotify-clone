<script lang="ts">
	import type { PlayableGroup } from '$lib/types/PlayableGroup';
	export let data: PlayableGroup;
</script>

<a class="container" href={`/${data.type.value}/${data.id}`}>
	<img src={data.imageUrl} alt="cover" width="48px" height="48px" />
	<div class="data-container">
		<h2>{data.name}</h2>
		<div class="secondary-data">
			{data.type.name} - {data.creator}
		</div>
	</div>
</a>

<style lang="scss">
	.container {
		display: flex;
		align-items: center;
		padding: 8px 16px;
		border-radius: 8px;
		margin-bottom: 8px;

		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;

		&:hover {
			background-color: var(--background-grey);
			cursor: pointer;
		}
	}

	img {
		-webkit-user-drag: none;
	}

	.data-container {
		margin-left: 16px;
		min-width: 0;
	}

	h2 {
		font-size: 0.9rem;
		margin-bottom: 6px;
		display: flex;
	}

	.secondary-data {
		color: var(--text-grey);
		font-size: 0.8rem;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
