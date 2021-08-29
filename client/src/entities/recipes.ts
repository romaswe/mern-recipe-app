export interface Ingrediens {
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
