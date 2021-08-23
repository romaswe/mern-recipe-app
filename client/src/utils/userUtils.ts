import { jwtData } from '../entities/jwt';
import { UserRoles } from '../entities/userEnums';

export const isAdmin = (jwt: jwtData | undefined) => {
	if (jwt?.role === UserRoles.admin) {
		return true;
	}

	return false;
};
