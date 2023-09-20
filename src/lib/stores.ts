import type { UserInfo } from '$lib/types/UserInfo';
import { writable } from 'svelte/store';

export const userData = writable<UserInfo | null>(null);
