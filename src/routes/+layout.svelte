<script lang="ts">
	import 'the-new-css-reset';
	import Footer from '$lib/footer/Footer.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import { onMount } from 'svelte';
	import { SpotifyCustomApi } from '$lib/spotify/api';

	import { page } from '$app/stores';
	import { userData } from '$lib/stores';
	import Header from '$lib/header/Header.svelte';

	let authenticated = false;

	onMount(async () => {
		authenticated =
			localStorage.getItem('code_verifier') != null && localStorage.getItem('access_token') != null;

		if (!authenticated && $page.url.searchParams.has('code')) {
			await SpotifyCustomApi.auth.getAuthTokens($page.url.searchParams.get('code') ?? '');
			authenticated = true;
		}

		if (authenticated) {
			const profile = await SpotifyCustomApi.user.getProfile();
			userData.set(profile);
		}
	});

	const onLoginClick = async () => {
		localStorage.removeItem('code_verifier');
		localStorage.removeItem('access_token');
		window.location.href = await SpotifyCustomApi.auth.createAuthUrl();
	};
</script>

{#if authenticated && $userData != null}
	<main>
		<Sidebar />

		<section>
			<Header />
			<slot />
		</section>
	</main>

	<Footer />
{:else}
	<div class="login-container">
		<h1>Spotify clone</h1>
		<p>Please login if you want to try out the application.</p>
		<button class="login-button" on:click={onLoginClick}> Log in </button>
	</div>
{/if}

<style lang="scss">
	main {
		flex: 1;
		padding: 4px;
		display: flex;
	}

	section {
		width: 100%;
		background-color: var(--background-dark);
		border-radius: 1rem;
		padding: 8px;
	}

	.login-container {
		display: flex;
		margin: auto auto;
		flex-direction: column;
		align-items: center;

		h1 {
			font-size: 32px;
			margin-bottom: 8px;
		}

		p {
			font-size: 16px;
			color: var(--text-grey);
			margin-bottom: 16px;
		}
	}

	.login-button {
		display: block;
		margin: auto auto;
		background-color: white;
		color: var(--background-dark);
		padding: 8px 32px;
		border-radius: 32px;
		font-size: 14px;

		&:hover {
			cursor: pointer;
			opacity: 0.8;
		}
	}
</style>
