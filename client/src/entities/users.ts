// Generated by https://quicktype.io
export interface UserJSON {
	success: boolean;
	data: PaginategDoc;
}
export interface PaginategDoc {
	docs: User[];
	totalDocs: number;
	limit: number;
	totalPages: number;
	page: number;
	pagingCounter: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: null;
	nextPage: null;
}

export interface User {
	role: string;
	_id: string;
	username: string;
	email: string;
	__v: number;
	resetPasswordExpire?: string;
	resetPasswordToken?: string;
}
