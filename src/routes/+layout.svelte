<script>
	import 'normalize.css';
</script>

<main>
	<sidebar>
		<div class="navigation">
			<h1>Lorem ipsum</h1>
		</div>
		<div class="library">
			<h1>Lorem ipsum</h1>
		</div>
	</sidebar>

	<section>
		<slot />
	</section>
</main>

<footer>
	<p>© 2023</p>
</footer>

<style lang="scss">
	sidebar {
		flex: 20%;
		margin-right: 4px;

		display: flex;
		flex-direction: column;

		div {
			background-color: #121212;
			border-radius: 1rem;
			height: 100%;
			padding: 8px;
		}

		.navigation {
			margin-bottom: 4px;
			flex: 15%;
		}

		.library {
			flex: 85%;
		}
	}

	main {
		flex: 1;
		padding: 4px;
		display: flex;
	}

	section {
		flex: 80%;
		background-color: #121212;
		border-radius: 1rem;
		padding: 8px;
	}

	footer {
		min-height: 75px;
		background-color: black;
	}
</style>
