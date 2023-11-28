<script lang="ts">
	import { playerStateStore } from '$lib/stores';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	const dispatch = createEventDispatcher();
	let progressRef: HTMLProgressElement;

	$: volume = tweened($playerStateStore.volume, {
		duration: 400,
		easing: cubicOut
	});

	function updateVolume(event: MouseEvent) {
		const { left, width } = progressRef.getBoundingClientRect();
		const { clientX } = event;

		let value = Math.round(((clientX - left) / width) * 100);

		value = value < 8 ? 0 : value > 92 ? 100 : value;

		dispatch('toggleVolume', { volume: value / 100 });
	}
</script>

<div>
	<div class="volume-container">
		<button
			class="color-text-grey icon-container"
			on:click={() =>
				$playerStateStore.volume > 0
					? ($playerStateStore.volume = 0)
					: ($playerStateStore.volume = 0.5)}
		>
			{#if $playerStateStore.volume > 0}
				<Icon icon="mdi:volume-high" width="24px" height="24px" />
			{:else}
				<Icon icon="mdi:volume-mute" width="24px" height="24px" />
			{/if}
		</button>

		<button on:click={(event) => updateVolume(event)}>
			<progress bind:this={progressRef} value={$volume} />
		</button>
	</div>
</div>

<style lang="scss">
	.volume-container {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-top: 4px;
		color: var(--text-grey);

		.icon-container {
			margin: 0 8px;
		}

		progress {
			display: block;
			width: 100px;
			height: 6px;
		}

		progress[value]::-webkit-progress-bar {
			background-color: var(--text-grey);
			border-radius: 16px;
		}

		progress[value]::-webkit-progress-value {
			background-color: white;

			border-radius: 16px;
		}
	}
</style>
