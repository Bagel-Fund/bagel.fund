export interface Grantee {
	name: string;
	link: string | null;
	age: number;
	projectDescription: string;
	fundedDate: string;
	tags: string[];
}

export type SortField = 'age' | 'tags' | 'fundedDate' | null;
export type SortDirection = 'asc' | 'desc';

export interface SortState {
	field: SortField;
	direction: SortDirection;
}
