import type { PlayerState } from '$lib/types/PlayerState';
import type { UserInfo } from '$lib/types/UserInfo';
import { writable } from 'svelte/store';

export const userData = writable<UserInfo | null>(null);

export const playerStore = writable<{
	connect: Function;
	addListener: Function;
	disconnect: Function;
	togglePlay: Function;
	setVolume: Function;
	seek: Function;
	previousTrack: Function;
	nextTrack: Function;
	getCurrentState: Function;
	getVolume: Function;
} | null>(null);

export const musicPlaying = writable<boolean>(false);
export const musicShuffle = writable<boolean>(false);
export const musicRepeat = writable<boolean>(false);

export const playerStateStore = writable<PlayerState>({
	playing: false,
	shuffle: false,
	repeat: false,
	volume: 0.5,
	positionMs: 0
});
