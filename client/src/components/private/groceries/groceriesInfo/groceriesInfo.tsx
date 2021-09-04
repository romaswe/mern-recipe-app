import axios from 'axios';
import { useState } from 'react';
import { Data, GroceriesJson } from '../../../../entities/groceries';
import './groceriesInfo.css';

const apiUrl = process.env.REACT_APP_BASE_URL;
export const GroceriesInfo = (props: any) => {
	const setGroceriesInfo = props.setGroceriesInfo;
	const groceriesInfo: GroceriesJson = props.groceriesInfo;
	const groceriesList = props.groceriesList;
	const setGroceriesList = props.setGroceriesList;

	const [error, setError] = useState('');

	// handle click event of the Remove button
	const handleRemoveClick = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};

		const grocerie: Data = {
			name: 'MyList',
			groceries: [],
		};

		try {
			const { data } = await axios.put(
				apiUrl + '/api/private/groceries',
				grocerie,
				config
			);

			setGroceriesList({
				...groceriesList,
				data: {
					groceries: [],
				},
			});

			setGroceriesInfo({
				...groceriesInfo,
				data: {
					size: 0,
				},
			});
		} catch (error: any) {
			console.log(error);
			setError(error.response.data.error);
		}
	};
	return (
		<div className='col-s-12 col-6'>
			<div className='grocerie-info-wrapper'>
				<h4>Information</h4>
				{error && <span className='error-message'>{error}</span>}
				<p>
					Antal i listan:{' '}
					{groceriesInfo && groceriesInfo.data
						? groceriesInfo?.data.size
						: '0'}
					{(groceriesInfo?.data?.size ?? 0) >= 75 && (
						<h4 className='max-groceries'>
							Max antal i inköpslistan, Tabort innan du lägger
							till fler
						</h4>
					)}
				</p>
				<div className='remove-button-wrapper'>
					<button
						className='remove-button'
						onClick={() => handleRemoveClick()}
					>
						Tabort allt i listan!
					</button>
				</div>
			</div>
		</div>
	);
};
