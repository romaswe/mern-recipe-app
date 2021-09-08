export interface RecipesListJSON {
	success: boolean;
	data: PaginategDoc;
}

export interface PaginategDoc {
	docs: Recipes[];
	totalDocs: number;
	limit: number;
	totalPages: number;
	page: number;
	pagingCounter: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: null | number;
	nextPage: null | number;
}

export interface Recipes {
	instructions?: string[];
	_id?: string;
	name: string;
	url?: string;
	notes?: string;
	description?: string;
	categories?: string[];
	ingrediens?: Ingrediens[];
	__v?: number;
}

export interface Ingrediens {
	_id?: string;
	amount: string;
	unit: string;
	name: string;
}
