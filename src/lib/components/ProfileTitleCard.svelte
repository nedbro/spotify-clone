<script lang="ts">
	import type { ProfileTitleCardData } from '$lib/types/ProfileTitleCardData';

	export let data: ProfileTitleCardData | undefined;
</script>

{#if data}
	<div class="card">
		<img src={data.imageUrl} alt="cover" class="albumIcon" />
		<div class="textData">
			<h4>{data.type}</h4>
			<h1>{data.title}</h1>
			<div class="extraInfo">
				<p class="artistName">
					{data.creator}
				</p>

				{data.extraInfo}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.card {
		display: flex;
		padding-left: 10px;
		padding-right: 16px;

		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	img {
		-webkit-user-drag: none;
		height: 16vw;
		width: 16vw;

		min-width: 200px;
		min-height: 200px;

		max-width: 225px;
		max-height: 225px;
	}

	.textData {
		margin-left: 16px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		.artistName {
			font-size: 0.8rem;
			margin-bottom: 6px;
			color: white;
		}

		h1 {
			font-size: 1.5rem;
			margin-bottom: 6px;
			font-weight: bold;
			overflow-wrap: break-word;
		}

		h4 {
			font-size: 0.8rem;
			margin-bottom: 6px;
			text-transform: capitalize;
			color: var(--text-grey);
		}
	}

	.extraInfo {
		color: var(--text-grey);
		font-size: 0.7rem;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
