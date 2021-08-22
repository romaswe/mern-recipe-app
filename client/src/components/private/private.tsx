import './private.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_BASE_URL;
const PrivateComponent = () => {
    const history = useHistory();
	const [error, setError] = useState('');
	const [privateData, setPrivateData] = useState('');

	useEffect(() => {
		const fetchPrivateDate = async () => {
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

		fetchPrivateDate();
	}, []);

	const logoutHandler = () => {
		localStorage.removeItem('authToken');
		history.push('/login');
	};

	return error ? (
		<span className='error-message'>{error}</span>
	) : (
		<div>
			<div>{privateData}</div>
			<button onClick={logoutHandler}>Logout</button>
		</div>
	);
};

export default PrivateComponent