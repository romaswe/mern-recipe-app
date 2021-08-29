import { JwtData } from '../../../entities/jwt';
import { isAdmin } from '../../../utils/userUtils';
import './navbar.css';

export const Navnbar = (props: any) => {
	const jwtData: JwtData = props.jwtData;
	const setactiveNavItem = props.setactiveNavItem;
	const activeNavItem = props.activeNavItem;

	const isActive = (item: string) => {
		if (item === activeNavItem) {
			return true;
		}
		return false;
	};

	const handleOnclick = (clickedName: string) => {
		setactiveNavItem(clickedName);
	};

	return (
		<div className='navbar-fixed'>
			<nav>
				<ul className='navbar'>
					<li
						key='groceries'
						className={`col-3 navbar-item ${
							isActive('groceries') ? 'active' : ''
						}`}
						onClick={() => {
							handleOnclick('groceries');
						}}
					>
						Inköpslista
					</li>
					<li
						key='recipes'
						className={`col-3 navbar-item ${
							isActive('recipes') ? 'active' : ''
						}`}
						onClick={() => {
							handleOnclick('recipes');
						}}
					>
						Recept
					</li>
					<li
						key='tips'
						className={`col-3 navbar-item ${
							isActive('tips') ? 'active' : ''
						}`}
						onClick={() => {
							handleOnclick('tips');
						}}
					>
						Mått &amp; tips
					</li>
					{isAdmin(jwtData) && (
						<li
							key='admin'
							className={`col-3 navbar-item ${
								isActive('admin') ? 'active' : ''
							}`}
							onClick={() => {
								handleOnclick('admin');
							}}
						>
							Admin
						</li>
					)}

					<li
						key='om'
						className={`col-3 navbar-item ${
							isActive('om') ? 'active' : ''
						}`}
						onClick={() => {
							handleOnclick('om');
						}}
					>
						Om
					</li>
					<li className='user-role-info'>
						<p>
							{jwtData?.username}: {jwtData?.role}
						</p>
					</li>
				</ul>
			</nav>
		</div>
	);
};