// Generated by https://quicktype.io

export interface GroceriesJson {
	success: boolean;
	data: Data;
}

export interface Data {
	groceries: string[];
	_id?: string;
	owner?: string;
	name?: string;
	size?: number;
	__v?: number;
}