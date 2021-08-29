import { JwtData } from '../entities/jwt';
import { UserRoles } from '../entities/userEnums';

export const isAdmin = (jwt: JwtData | undefined) => {
	if (jwt?.role === UserRoles.admin) {
		return true;
	}

	return false;
};
