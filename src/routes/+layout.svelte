<script>
	import 'the-new-css-reset';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import Footer from '$lib/footer/Footer.svelte';
</script>

<main>
	<Sidebar />

	<section>
		<slot />
	</section>
</main>

<Footer />

<style>
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
</style>
