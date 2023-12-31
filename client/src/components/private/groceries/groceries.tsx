import axios from 'axios';
import { useEffect, useState } from 'react';
import { Groceri, GroceriesJson } from '../../../entities/groceries';
import { JwtData } from '../../../entities/jwt';
import { AddGroceries } from './addGroceries/addGroceries';
import './groceries.css';
import { GroceriesInfo } from './groceriesInfo/groceriesInfo';
import { GroceriesItem } from './groceriesItem/groceriesItem';

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
					`/api/private/groceries`,
					config
				);
				setGroceriesList(data);
			} catch (error: any) {
				console.log(error.response.data.error);
				setError(error.response.data.error);
			}
		};

		const fetchGroceriesInformation = async () => {
			try {
				const { data } = await axios.get(
					`/api/private/getGroceriesInfo`,
					config
				);

				setGroceriesInfo(data);
			} catch (error: any) {
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
				<div className='row'>
					<div className='col-12'>
						{groceriesInfo && (
							<GroceriesInfo
								groceriesList={groceriesList}
								setGroceriesList={setGroceriesList}
								setGroceriesInfo={setGroceriesInfo}
								groceriesInfo={groceriesInfo}
							/>
						)}
					</div>
					<div className='col-12'>
						<AddGroceries
							groceriesList={groceriesList}
							setGroceriesList={setGroceriesList}
							setGroceriesInfo={setGroceriesInfo}
							groceriesInfo={groceriesInfo}
						/>
					</div>
				</div>
			</div>
			<div className='col-s-12 col-9'>
				{groceriesList?.data && (
					<div className='row'>
						{groceriesList?.data.groceries.map(
							(groceri: Groceri, i: number) => {
								return (
									<GroceriesItem
										key={i}
										grocerieName={groceri.name}
										groceriesList={groceriesList}
										setGroceriesList={setGroceriesList}
										setGroceriesInfo={setGroceriesInfo}
										groceriesInfo={groceriesInfo}
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
