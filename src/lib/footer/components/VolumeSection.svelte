<script lang="ts">
	import type { FooterInfo } from '$lib/types/FooterInfo';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let data: FooterInfo;

	const dispatch = createEventDispatcher();
	let progressRef: HTMLProgressElement;

	$: volume = tweened(data.volume / 100, {
		duration: 400,
		easing: cubicOut
	});

	function getFormattedLength(seconds: number) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secondsLeft = seconds % 60;

		return `${hours ? hours + ':' : ''}${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
	}

	function updateVolume(event: MouseEvent) {
		const { left, width } = progressRef.getBoundingClientRect();
		const { clientX } = event;

		let value = Math.round(((clientX - left) / width) * 100);

		value = value < 8 ? 0 : value > 92 ? 100 : value;

		dispatch('toggleVolume', { value });
	}
</script>

<div>
	<div class="volume-container">
		<button
			class="color-text-grey icon-container"
			on:click={() => dispatch('toggleVolume', { value: data.volume > 0 ? 0 : 50 })}
		>
			{#if data.volume > 0}
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
		justify-content: center;
		padding-top: 4px;
		color: var(--text-grey);

		.icon-container {
			margin: 0 8px;
		}

		progress {
			display: block;
			width: 70px;
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
