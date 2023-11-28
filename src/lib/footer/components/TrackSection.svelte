<script lang="ts">
	import { playerStateStore } from '$lib/stores';
</script>

<div class="container">
	<img src={$playerStateStore.track?.imageUrl} alt="cover" width="48px" height="48px" />
	<div class="data-container">
		<h2>{$playerStateStore.track?.title}</h2>
		<div class="secondary-data">
			{$playerStateStore.track?.creator}
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		align-items: center;

		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	img {
		-webkit-user-drag: none;
	}

	.data-container {
		margin-left: 16px;
		min-width: 0;
		max-width: 140px;

		h2 {
			font-size: 1rem;
			margin-bottom: 6px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.secondary-data {
		color: var(--text-grey);
		font-size: 0.7rem;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.like-container {
		margin-left: 32px;

		button {
			cursor: pointer;
		}

		.filled-heart {
			color: var(--project-green);

			&:hover {
				opacity: 0.8;
			}
		}

		.empty-heart {
			color: var(--text-grey);

			&:hover {
				color: white;
			}
		}
	}
</style>
