<script>
	import Icon from '@iconify/svelte';
</script>

<div class="your-library">
	<div>
		<Icon icon="fluent:library-24-filled" height="25" width="25" />
		<p>Your Library</p>
	</div>

	<div>
		<Icon icon="octicon:plus-24" width="25" height="25" />
	</div>
</div>

<style lang="scss">
	.your-library {
		all: unset;
		color: #b3b3b3;
		display: flex;
		padding: 8px 16px 0px 16px;
		margin-bottom: 16px;

		p {
			font-size: 16px;
			font-weight: bold;
			padding-left: 16px;
			display: flex;
			align-items: center;
		}

		div:hover {
			cursor: pointer;
			color: white;
		}

		div:first-child {
			display: flex;
			align-items: center;
		}

		div:last-child {
			margin-left: auto;
		}
	}
</style>
