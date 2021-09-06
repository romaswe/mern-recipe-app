import { JwtData } from '../../../entities/jwt';
import { isAdmin } from '../../../utils/userUtils';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import './navbar.css';
import { useState } from 'react';

export const Navnbar = (props: any) => {
	const jwtData: JwtData = props.jwtData;
	const setactiveNavItem = props.setactiveNavItem;
	const activeNavItem = props.activeNavItem;

	const [showNavbar, setShowNavbar] = useState(true);

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
					<div className='row'>
						{showNavbar && (
							<div className='col-12'>
								<div className='col-s-12 col-4'>
									<li
										key='groceries'
										className={`col-s-12 col-2 navbar-item ${
											isActive('groceries') && 'active'
										}`}
										onClick={() => {
											handleOnclick('groceries');
										}}
									>
										Inköpslista
									</li>

									<li
										key='recipes'
										className={`col-s-12 col-2 navbar-item ${
											isActive('recipes') && 'active'
										}`}
										onClick={() => {
											handleOnclick('recipes');
										}}
									>
										Recept
									</li>

									<li
										key='tips'
										className={`col-s-12 col-2 navbar-item ${
											isActive('tips') && 'active'
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
											className={`col-s-12 col-2 navbar-item ${
												isActive('admin') && 'active'
											}`}
											onClick={() => {
												handleOnclick('admin');
											}}
										>
											Admin
										</li>
									)}

									<li
										key='about'
										className={`col-s-12 col-2 navbar-item ${
											isActive('about') && 'active'
										}`}
										onClick={() => {
											handleOnclick('about');
										}}
									>
										Om
									</li>
								</div>

								<div className='col-s-12 col-8'>
									<div className='col-12'>
										<li className='user-role-info'>
											<p>
												{jwtData?.username}:{' '}
												{jwtData?.role}
											</p>
										</li>
									</div>
								</div>
							</div>
						)}
						<div
							className='col-s-12 col-0 navbar-item'
							onClick={() => setShowNavbar(!showNavbar)}
						>
							{showNavbar ? <GoChevronUp /> : <GoChevronDown />}
						</div>
					</div>
				</ul>
			</nav>
		</div>
	);
};
