import { jwtData } from '../../../entities/jwt';
import { isAdmin } from '../../../utils/userUtils';
import './navbar.css';

export const Navnbar = (props: any) => {
	const jwtData: jwtData = props.jwtData;
	const setactiveNavItem = props.setactiveNavItem;
	const activeNavItem = props.activeNavItem;

	const isActive = (item: string) => {
		if (item === activeNavItem) {
			return true;
		}
		return false;
	};

	const handleOnclick = (clickedName: string) => {
		console.log(clickedName);
		setactiveNavItem(clickedName);
	};

	return (
		<div className='navbar-fixed'>
			<nav>
				<ul className='navbar'>
					<li
						className={`col-3 navbar-item ${
							isActive('groceries') ? 'active' : ''
						}`}
						onClick={() => {
							handleOnclick('groceries');
						}}
					>
						Groceries
					</li>
					<li
						className={`col-3 navbar-item ${
							isActive('recipes') ? 'active' : ''
						}`}
						onClick={() => {
							handleOnclick('recipes');
						}}
					>
						Recipes
					</li>
					{isAdmin(jwtData) && (
						<li
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
