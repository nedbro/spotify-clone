<script lang="ts">
	import { logOut } from '$lib/authHandler';
	import { userData } from '$lib/stores';

	let showDropdown = false;

	function checkForFocusOut(node: Node, callback: Function) {
		const handleClick = (event: MouseEvent) => {
			if (node && !node.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<header>
	<button class="user-dropdown" on:click={() => (showDropdown = !showDropdown)}>
		<img
			src={$userData?.images?.[0].url}
			alt="avatar"
			class="user-img"
			use:checkForFocusOut={() => (showDropdown = false)}
		/>
		<div class="dropdown-content" class:show={showDropdown}>
			<button on:click={logOut}>logout</button>
		</div>
	</button>
</header>

<style lang="scss">
	header {
		width: 100%;
		padding-top: 8px;
	}

	.user-dropdown {
		display: block;
		margin-left: auto;
		margin-right: 16px;
	}

	.user-img {
		display: block;
		height: 24px;
		width: 24px;
		border-radius: 16px;

		cursor: pointer;
	}

	.dropdown-content {
		display: none;
		position: absolute;
		background-color: var(--background-elevated-dark);

		min-width: 60px;
		right: 24px;

		button {
			color: white;
			padding: 12px 16px;
			display: block;
            cursor: pointer;
		}
	}

	.show {
		display: block;
	}
</style>
