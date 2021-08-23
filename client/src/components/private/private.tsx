import './private.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { jwtData } from '../../entities/jwt';
import { isAdmin } from '../../utils/userUtils';
import { Navnbar } from './navbar/navbar';

const apiUrl = process.env.REACT_APP_BASE_URL;
const PrivateComponent = () => {
	const history = useHistory();
	const [error, setError] = useState('');
	const [privateData, setPrivateData] = useState('');
	const decodedJWT = useRef<jwtData>();
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

	return error ? (
		<span className='error-message'>{error}</span>
	) : (
		<div className='grid' id='topContainer'>
			<div className='col-12'>
				<Navnbar jwtData={decodedJWT.current} />
			</div>
			<div className='col-12 wrapper'>
				<p>Här kommer första synas</p>
			</div>

			<div className='col-12'>
				<p>Här kommer andra synas</p>
			</div>

			<div className='col-12'>
				<p>Här kommer tredje synas</p>
			</div>

			<button onClick={logoutHandler}>Logout</button>
		</div>
	);
};

export default PrivateComponent;
