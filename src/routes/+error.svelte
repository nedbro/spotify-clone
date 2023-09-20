<script>
	import { onMount } from 'svelte';

	import { invalidateAll } from '$app/navigation';

	onMount(() => {
		localStorage.removeItem('code_verifier');
		localStorage.removeItem('access_token');

		invalidateAll();
	});
</script>

<p>asdasdasdasda</p>
