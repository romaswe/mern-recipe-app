import './private.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { JwtData } from '../../entities/jwt';
import { isAdmin } from '../../utils/userUtils';
import { Navnbar } from './navbar/navbar';
import AdminComponent from './admin/admin';

const apiUrl = process.env.REACT_APP_BASE_URL;
const PrivateComponent = () => {
	const history = useHistory();
	const [error, setError] = useState('');
	const [privateData, setPrivateData] = useState('');
	const [activeNavItem, setactiveNavItem] = useState('recipes');
	const decodedJWT = useRef<JwtData>();
	useEffect(() => {
		const fetchPrivateData = async () => {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem(
						'authToken'
					)}`,
				},
			};

			try {
				const { data } = await axios.get(
					apiUrl + '/api/private',
					config
				);
				setPrivateData(data.data);
			} catch (error) {
				localStorage.removeItem('authToken');
				console.log(error.response.data.error);
				setError('You are not authorized please login');
			}
		};

		var token = localStorage.getItem('authToken') ?? '';
		decodedJWT.current = jwt_decode(token);

		console.log(isAdmin(decodedJWT.current));

		fetchPrivateData();
	}, []);

	const logoutHandler = () => {
		localStorage.removeItem('authToken');
		history.push('/login');
	};

	const isActive = (item: string) => {
		if (item === activeNavItem) {
			return true;
		}
		return false;
	};

	return error ? (
		<span className='error-message'>{error}</span>
	) : (
		<div className='grid' id='topContainer'>
			<div className='col-12'>
				<Navnbar
					jwtData={decodedJWT.current}
					activeNavItem={activeNavItem}
					setactiveNavItem={setactiveNavItem}
				/>
			</div>
			{isActive('groceries') && (
				<div className='col-12 wrapper'>
					<p>Här kommer första synas</p>
				</div>
			)}

			{isActive('recipes') && (
				<div className='col-12'>
					<p>Här kommer andra synas</p>
				</div>
			)}

			{isActive('admin') && (
				<div className='col-12'>
					<AdminComponent />
				</div>
			)}

			<div className='logout-button col-12'>
				<button className='standard-button' onClick={logoutHandler}>
					Logout
				</button>
			</div>
		</div>
	);
};

export default PrivateComponent;
