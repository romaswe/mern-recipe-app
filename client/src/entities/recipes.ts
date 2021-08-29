export interface Ingrediens {
	_id?: string;
	amount: string;
	unit: string;
	name: string;
}

export interface RecipesListJSON {
	success: boolean;
	data: Recipes[];
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
