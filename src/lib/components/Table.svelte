<script lang="ts">
	import type { TableInput } from './../types/Table.ts';

	export let config: TableInput = {
		columns: [],
		dataSource: []
	};
</script>

<table>
	<thead>
		<tr>
			{#each config.columns as column}
				<th>{column.title}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each config.dataSource as row}
			<tr>
				{#each config.columns as column}
					<td>{row[column.key]}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	table {
		width: 100%;
		margin-left: 16px;

		th,
		td {
			padding: 8px;
			text-align: left;
			transition: background-color 0.3s ease;
		}

		th {
			color: var(--text-grey);
			font-size: 13px;
			border-bottom: 0.5px solid var(--background-elevated-dark);
		}

		td {
			vertical-align: middle;

			font-size: 0.9rem;
		}

		th:first-child,
		td:first-child {
			width: 30px;
		}

		th:last-child,
		td:last-child {
			text-align: center;
		}

		tr:hover td {
			background-color: #3c3c3c; /* Lighter shade on hover */
		}

		th:not(:first-child),
		td:not(:first-child) {
			width: calc((100% - 30px) / 2);
		}
	}
</style>
