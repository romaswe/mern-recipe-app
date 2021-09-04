// Generated by https://quicktype.io
export interface UserJSON {
	success: boolean;
	data: User[];
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