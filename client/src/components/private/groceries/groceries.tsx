import axios from 'axios';
import { useEffect, useState } from 'react';
import { GroceriesJson } from '../../../entities/groceries';
import { JwtData } from '../../../entities/jwt';
import './groceries.css';
import { GroceriesInfo } from './groceriesInfo/groceriesInfo';
import { GroceriesItem } from './groceriesItem/groceriesItem';
const apiUrl = process.env.REACT_APP_BASE_URL;
export const Groceries = (props: any) => {
	const jwtData: JwtData = props.jwtData;
	const [error, setError] = useState('');
	const [groceriesList, setGroceriesList] = useState<GroceriesJson>();
	const [groceriesInfo, setGroceriesInfo] = useState<GroceriesJson>();
	useEffect(() => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};

		const fetchGroceriesList = async () => {
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

		const fetchGroceriesInformation = async () => {
			try {
				const { data } = await axios.get(
					apiUrl + `/api/private/getGroceriesInfo`,
					config
				);
				setGroceriesInfo(data);
			} catch (error) {
				console.log(error.response.data.error);
				setError(error.response.data.error);
			}
		};
		fetchGroceriesList();
		fetchGroceriesInformation();
	}, [jwtData.id]);

	return error ? (
		<span className='error-message'>{error}</span>
	) : (
		<div className='row'>
			<div className='col-s-12 col-3'>
				<GroceriesInfo groceriesInfo={groceriesInfo} />
			</div>
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
		</div>
	);
};
