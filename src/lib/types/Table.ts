export interface TableColumnInput {
	key: string;
	title: string;
	width?: number;
}

export interface TableInput {
	columns: TableColumnInput[];
	dataSource: Record<string, any>[];
	pagination?: boolean;
	pageSize?: number;
	rowKey?: string;
}
