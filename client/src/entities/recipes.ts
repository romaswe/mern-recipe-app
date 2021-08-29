export interface Ingrediens {
	_id?: string;
	amount: string;
	unit: string;
	name: string;
}

export interface Recipes {
	name: string;
	url: string;
	notes: string;
	ingrediens: Ingrediens[];
	instructions: string[];
}

export interface RecipesListJSON {
	success: boolean;
	data: Recipe[];
}

export interface Recipe {
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
