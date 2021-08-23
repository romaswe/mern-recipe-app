import { jwtData } from '../../../entities/jwt';
import './navbar.css';

export const Navnbar: React.FC<jwtData> = (decodedJWT: jwtData) => {
	return (
		<div className='navbar-fixed'>
			<nav>
				<div className='navbar row'>
					<div className='col-3 row'>
						<div className='col-2 navbar-item'>första</div>
						<div className='col-2 navbar-item'>andra</div>
						<div className='col-2 navbar-item'>tredje</div>
					</div>
					<div className='col-9 user-role-info'>
						{decodedJWT.role}
					</div>
				</div>
			</nav>
		</div>
	);
};
