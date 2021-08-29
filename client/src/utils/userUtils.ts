import { JwtData } from '../entities/jwt';
import { UserRoles } from '../entities/userEnums';

export const isAdmin = (jwt: JwtData | undefined) => {
	if (jwt?.role === UserRoles.admin) {
		return true;
	}

	return false;
};

export const isUser = (jwt: JwtData | undefined) => {
	if (jwt?.role === UserRoles.user) {
		return true;
	}

	return false;
};

export const isViewer = (jwt: JwtData | undefined) => {
	if (jwt?.role === UserRoles.viewer) {
		return true;
	}

	return false;
};
