
import axios from 'axios';
import { useEffect, useState } from 'react';
import { JwtData } from '../../../entities/jwt';
import './groceries.css';
const apiUrl = process.env.REACT_APP_BASE_URL;
export const Groceries = (props: any) => {
    const jwtData: JwtData = props.jwtData;
    const [error, setError] = useState('');
	useEffect(() => {
		const fetchRecipesList = async () => {
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
					apiUrl + `/api/private/getGrocerieList`,
					config
				);
				//setRecipesList(data);
                console.log(data);
                
			} catch (error) {
				console.log(error.response.data.error);
				setError(error.response.data.error);
			}
		};
		fetchRecipesList();
	}, [jwtData.id]);

	return error ? (
		<span className='error-message'>{error}</span>
	) : (
		<div className='col-12'>
            <p>hej</p>
		</div>
	);
};
