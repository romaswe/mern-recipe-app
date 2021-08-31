import axios from 'axios';
import { useEffect, useState } from 'react';
import { GroceriesJson } from '../../../entities/groceries';
import { JwtData } from '../../../entities/jwt';
import './groceries.css';
import { GroceriesItem } from './groceriesItem/groceriesItem';
const apiUrl = process.env.REACT_APP_BASE_URL;
export const Groceries = (props: any) => {
	const jwtData: JwtData = props.jwtData;
	const [error, setError] = useState('');
	const [groceriesList, setGroceriesList] = useState<GroceriesJson>();
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
				setGroceriesList(data);
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
		<div className='row'>
			<div className='col-s-12 col-9'>
				{groceriesList?.data && (
					<div className='row'>
						{groceriesList?.data.groceries.map(
							(grocerieName: string, i: number) => {
								return (
									<GroceriesItem
										key={i}
										grocerieName={grocerieName}
									/>
								);
							}
						)}
					</div>
				)}
			</div>
			<div className='col-s-12 col-3'>Information</div>
		</div>
	);
};
